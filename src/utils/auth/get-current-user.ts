import type { User } from "@supabase/supabase-js";
import { createServerClient } from "~/lib/supabase";

export async function getCurrentUser(): Promise<{
	isAdmin: boolean;
	isSignedIn: boolean;
	currentUser: User | null;
}> {
	const supabase = createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAdmin = user?.app_metadata.role === "admin";
	const isSignedIn = !!user;
	const currentUser: User | null = user;

	return { isAdmin, isSignedIn, currentUser };
}
