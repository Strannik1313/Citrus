export class CookieHelper {
	static getCookieFromHeader(cookie: string | undefined): string | undefined {
		return cookie?.split('session=')[1]?.split(';')[0];
	}
}
