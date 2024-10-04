"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "~/lib/supabase";
import { getCurrentUser } from "~/utils/auth/get-current-user";
import type { ChangeEmailFormSchema } from "./schema";

export const updateProfileAction = async (data: ChangeEmailFormSchema) => {
	const { currentUser } = await getCurrentUser();
	if (!currentUser) {
		throw new Error("ユーザーが見つかりません。");
	}

	const supabase = createServerClient();

	const { error } = await supabase.auth.updateUser({
		email: data.email,
	});

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/profile");
	return;
};
