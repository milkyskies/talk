import { Auth } from '$lib/auth'
import { CookiesManager } from '$lib/cookies_manager'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const cookiesManager = new CookiesManager(event.cookies) 
	const session_id = cookiesManager.session_id
	if (!session_id) return await resolve(event)

	const auth_token = await Auth.find_auth_token(session_id)
	if (!auth_token) return await resolve(event)

	await Auth.access_valid(auth_token.id, event.cookies)

	event.locals.user = {
		email: auth_token.user.email,
		role: auth_token.user.role.name,
	}

	return await resolve(event)
}
