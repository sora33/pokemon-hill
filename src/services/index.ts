// CRUD処理、API通信処理をまとめたライブラリ

export const host = process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT;
export const path = (path?: string) => `${host}${path}`;

export class FetchError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export const handleSucceed = async (res: Response) => {
	const data = await res.json();
	if (!res.ok) {
		throw new FetchError(res.statusText, res.status);
	}
	return data;
};

export const handleFailed = async (err: unknown) => {
	if (err instanceof FetchError) {
		console.warn(err.message);
	}
	throw err;
};

export const createSearchParams = (
	params: { [key: string]: string | number | undefined } | undefined,
): URLSearchParams => {
	if (!params) {
		return new URLSearchParams();
	}
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	}
	return searchParams;
};
