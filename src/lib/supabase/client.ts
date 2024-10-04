import { createBrowserClient as createBrowserSupabaseClient } from "@supabase/ssr";
import type { Database } from "~/types/supabase";

export const createBrowserClient = () =>
	createBrowserSupabaseClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
