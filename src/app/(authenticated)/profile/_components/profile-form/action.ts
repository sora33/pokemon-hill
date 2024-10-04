"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "~/lib/supabase";
import { getCurrentUser } from "~/utils/auth/get-current-user";
import type { ProfileFormSchema } from "./schema";

export const updateProfileAction = async (data: ProfileFormSchema) => {
	const { currentUser } = await getCurrentUser();
	if (!currentUser) {
		throw new Error("ユーザーが見つかりません。");
	}

	const supabase = createServerClient();

	const { error } = await supabase.auth.updateUser({
		data: {
			...data,
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/profile");
	return;
};
