import type { Example } from "~/types";
import { path, handleFailed, handleSucceed } from "./";

export const getExamples = async (): Promise<Example> => {
	return fetch(path("/api/example"), {
		cache: "force-cache",
		next: {
			tags: ["example"],
		},
	})
		.then(handleSucceed)
		.catch(handleFailed);
};
