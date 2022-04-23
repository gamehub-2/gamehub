type Optional<T> = T | null;

type GraphQLError = {
	message: string;
	locations: {
		line: number;
		column: number;
	};
};

type GraphQLResponse<T> = {
	json: {
		data?: T;
		errors?: Array<GraphQLError>;
	};
	status: number;
};

type AccountType = "user" | "admin" | "owner" | "developer";

type Variables = { [key: string]: Optional<string> };

class ExtendedWindow extends Window {
	createPostModal(): void;
	openReportModal(): void;
	terminateModal(): void;
	terminateAccount(): void;
	promoteModal(): void;
	demoteModal(): void;
	promoteAccount(): void;
	demoteAccount(): void;
}

type ValidatorResponse = { success: boolean; message?: string };

type Validator = (value: string) => ValidatorResponse;

type GraphQLScheme = "mutation" | "query";

type APIResponse<T> = {
	ok: boolean;
	response: GraphQLResponse<T>;
	message?: string;
};

type GQLHeaders = {
	Accept: string;
	"Content-Type": string;
	Authorization?: string;
};
