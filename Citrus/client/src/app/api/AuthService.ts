import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { AuthForm } from '@interfaces/AuthForm';
import { Observable } from 'rxjs';
import { UserDto } from '@models/UserDto';
import { SUPPRESS_EVENT } from '@constants/SUPPRESS_EVENT';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(form: AuthForm): Observable<UserDto> {
		return this.http.post<UserDto>('/api/auth/login', form, { context: new HttpContext().set(SUPPRESS_EVENT, true) });
	}

	register(form: AuthForm): Observable<UserDto> {
		return this.http.post<UserDto>('/api/auth/register', form, {
			context: new HttpContext().set(SUPPRESS_EVENT, true),
		});
	}

	logout(user: UserDto): Observable<void> {
		return this.http.post<void>('api/auth/logout', user, { context: new HttpContext().set(SUPPRESS_EVENT, true) });
	}

	refreshTokens(): Observable<string> {
		return this.http.get<string>('/api/auth/refresh-tokens', { context: new HttpContext().set(SUPPRESS_EVENT, true) });
	}

	currentUser(): Observable<UserDto> {
		return this.http.get<UserDto>('/api/auth/current-user', { context: new HttpContext().set(SUPPRESS_EVENT, true) });
	}
}
