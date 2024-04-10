import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import { MainNav } from "@/components/section/main-nav";
import { DashboardNav } from "./_components/dashboard-nav";
export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await checkAuth();
	return (
		<main>
			<div className="flex h-screen">
				<div className="flex flex-col h-screen w-full">
					<MainNav />
					<DashboardNav />
					<div className="py-6 px-6 md:px-10 bg-muted flex-auto">
						{children}
					</div>
				</div>
			</div>
		</main>
	);
}
