import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

import { Inter } from 'next/font/google';
import * as H from 'next/headers';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { TrpcProvider } from '@/lib/trpc/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Kino',
	description: 'A place for your projects',
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const headers = await H.headers();
	return (
		<html lang='en' suppressHydrationWarning className={inter.className}>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<TrpcProvider headers={headers}>{children}</TrpcProvider>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
