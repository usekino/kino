import { validateAuthRequest } from "@/lib/auth";
import { lucia } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { session } = await validateAuthRequest();

	// if (!session) {
	// 	return NextResponse.redirect(
	// 		new URL("app.localhost:3000/sign-in", request.url)
	// 	);
	// }

	await lucia.invalidateSession(session?.id ?? "");

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return NextResponse.redirect(new URL("/sign-in", request.url));
}
