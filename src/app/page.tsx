import { lucia, getUser } from "@/lib/auth";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { validateRequest } from "@/lib/validate";

export default async function Page() {
	const  user  = await getUser();
	if (!user) {
		return redirect("/sign-in");
	}
	return (
		<>
			<h1>Hi, {user.username}!</h1>
			<p>Your user ID is {user.id}.</p>
			<form action={logout}>
				<button>Sign out</button>
			</form>
		</>
	);
}

async function logout(){
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}