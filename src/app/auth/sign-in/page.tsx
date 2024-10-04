import type { Message } from "~/components/modules/form-message";
import { SignInForm } from "./_comp/sign-in-form/form";

export default function SignIn({ searchParams }: { searchParams: Message }) {
	return <SignInForm searchParams={searchParams} />;
}
