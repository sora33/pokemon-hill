import { Group, Loader } from "@mantine/core";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createServerClient } from "~/lib/supabase/server";

export default function Page() {
	return (
		<Suspense
			fallback={
				<Group justify="center" h="100vh">
					<Loader />
				</Group>
			}
		>
			<AuthCheck />
		</Suspense>
	);
}

async function AuthCheck() {
	const supabase = createServerClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		return redirect("/c");
	}

	if (data) {
		return redirect("/dashboard");
	}

	return redirect("/c");
}
