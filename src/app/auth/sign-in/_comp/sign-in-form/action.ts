"use server";

import { createServerClient } from "~/lib/supabase";
import type { SignInFormSchema } from "./schema";

export const signInAction = async (data: SignInFormSchema) => {
	const supabase = createServerClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password,
	});

	if (error) {
		throw error;
	}

	return {
		type: "success" as const,
		message: "ログインしました。",
	};
};
