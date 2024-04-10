// import { Links } from "./links";
import Link from "next/link";
import { Search } from "./search";
import TeamSwitcher from "./team-switcher";
import { UserNav } from "./user-nav";
import { getUserAuth } from "@/lib/auth/utils";
import { Links } from "./links";

export const MainNav = async () => {
	const { session } = await getUserAuth();

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-6 md:px-8">
				<Link
					href={session ? "/app" : "/"}
					className="mr-6 font-bold tracking-widest hover:underline hover:underline-offset-2 hover:decoration-2"
				>
					KINO
				</Link>
				<TeamSwitcher />
				<Links className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<UserNav />
				</div>
			</div>
		</div>
	);
};
