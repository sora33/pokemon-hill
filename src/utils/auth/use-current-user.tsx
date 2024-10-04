"use client";

import type { User } from "@supabase/supabase-js";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { createBrowserClient } from "~/lib/supabase/client";

type CurrentUserState = {
	isAdmin: boolean;
	isSignedIn: boolean;
	currentUser: User | null;
	isLoading: boolean;
};

const CurrentUserContext = createContext<CurrentUserState | undefined>(
	undefined,
);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<CurrentUserState>({
		isAdmin: false,
		isSignedIn: false,
		currentUser: null,
		isLoading: true,
	});

	useEffect(() => {
		const supabase = createBrowserClient();

		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			setState({
				isAdmin: user?.app_metadata.role === "admin",
				isSignedIn: !!user,
				currentUser: user,
				isLoading: false,
			});
		};

		fetchUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(fetchUser);

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const contextValue = useMemo(() => state, [state]);

	return (
		<CurrentUserContext.Provider value={contextValue}>
			{children}
		</CurrentUserContext.Provider>
	);
};

export const useCurrentUser = (): CurrentUserState => {
	const context = useContext(CurrentUserContext);
	if (context === undefined) {
		throw new Error("useCurrentUser must be used within a CurrentUserProvider");
	}
	return context;
};
