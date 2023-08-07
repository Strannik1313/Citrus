import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthForm } from '@interfaces/AuthForm';
import { Observable } from 'rxjs';
import { UserDto } from '@models/UserDto';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(form: AuthForm): Observable<UserDto> {
		return this.http.post<UserDto>('/api/auth/login', form);
	}

	register(form: AuthForm): Observable<UserDto> {
		return this.http.post<UserDto>('/api/auth/register', form);
	}

	logout(): Observable<void> {
		return this.http.post<void>('api/auth/logout', {});
	}

	refreshTokens(): Observable<{ accept: string }> {
		return this.http.get<{ accept: string }>('/api/auth/refresh-tokens', {});
	}

	currentUser(): Observable<UserDto> {
		return this.http.get<UserDto>('/api/auth/current-user', {});
	}
}
