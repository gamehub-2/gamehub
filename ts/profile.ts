import highlightNav from "./lib/nav";
import startMsg from "./lib/startMessage";
import handleEpoch from "./lib/handleEpoch";
import registerModalClosers from "./lib/registerModalClosers";
import { Modal } from "./lib/modal";
import { Form } from "./lib/form";
import { GraphQLClient } from "./lib/api/executor";
import handleFormPromise from "./lib/utils/handleFormPromise";
import registerModalOpener from "./lib/registerModalOpeners";

startMsg();

window.addEventListener("DOMContentLoaded", () => {
	highlightNav();
	handleEpoch();
	registerModalClosers();
	registerModalOpener();

	const username = document.body.getAttribute("data-user-name")!;
	const form = new Form("report-form");
	const reason = form.getInput("report-reason");
	const graphql = new GraphQLClient();

	reason.addValidator(data => {
		if (data.length > 300) {
			return {
				success: false,
				message: "Cannot exceed 300 characters",
			};
		}

		return { success: true };
	});

	form.setCallback((_, data) => {
		const promise = graphql.userReport(data["report-reason"], username);
		handleFormPromise(promise, form, () => window.location.reload());
	});

	// here lies: dry principle

	window.terminateAccount = () => {
		const promise = graphql.deleteAccount(username);
		promise.then(_ => window.location.reload());
	};

	window.promoteAccount = () => {
		const promise = graphql.promoteAccount(username);
		promise.then(_ => window.location.reload());
	};

	window.demoteAccount = () => {
		const promise = graphql.demoteAccount(username);
		promise.then(_ => window.location.reload());
	};
});

declare let window: ExtendedWindow;
