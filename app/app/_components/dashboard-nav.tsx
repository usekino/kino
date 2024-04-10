import { cn } from "@/lib/utils";
import Link from "next/link";

export const DashboardNav = ({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) => {
	return (
		<div className="border-b">
			<div className="py-6 px-6 md:px-10">
				<h1 className="text-3xl font-bold mt-10 mb-3">Dashboard</h1>
				<nav
					className={cn("flex items-center space-x-4 lg:space-x-6", className)}
					{...props}
				>
					<Link
						href="/app"
						className="font-medium transition-colors hover:text-stone-950 dark:hover:text-primary hover:underline"
					>
						Dashboard
					</Link>
					<Link
						href="/app/settings"
						className="font-medium transition-colors hover:text-stone-950 dark:hover:text-primary hover:underline"
					>
						Settings
					</Link>
					<Link
						href="/app/user"
						className="font-medium transition-colors hover:text-stone-950 dark:hover:text-primary hover:underline"
					>
						User
					</Link>
					<Link
						href="/app/resend"
						className="font-medium transition-colors hover:text-stone-950 dark:hover:text-primary hover:underline"
					>
						Resend
					</Link>
				</nav>
			</div>
		</div>
	);
};
