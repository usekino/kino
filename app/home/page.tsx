import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";

export default async function HomePage() {
	const { session } = await getUserAuth();
	return (
		<div>
			<h1 className="text-6xl">HOME PAGE</h1>
			{session ? (
				<div>
					<h2>Profile</h2>
					<pre>{JSON.stringify(session, null, 2)}</pre>
				</div>
			) : (
				<Link href="/sign-in">Sign in</Link>
			)}
		</div>
	);
}
