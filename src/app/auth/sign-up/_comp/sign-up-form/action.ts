"use server";

import { headers } from "next/headers";
import { createServerClient } from "~/lib/supabase";
import { supabaseAuthErrorCodeToJapaneseMessage } from "~/lib/supabase/error-code";
import { type SignUpFormSchema, signUpFormSchema } from "./schema";

export const signUpAction = async (data: SignUpFormSchema) => {
	const supabase = createServerClient();
	const origin = headers().get("origin");

	// バリデーション
	const result = signUpFormSchema.safeParse(data);
	if (!result.success) {
		throw new Error(result.error.message);
	}

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
			data: {
				name: data.name,
			},
		},
	});

	if (error) {
		console.error(`${error.code} ${error.message}`);
		throw new Error(
			error.code
				? supabaseAuthErrorCodeToJapaneseMessage[error.code]
				: error.message,
		);
	}
	return;
};
