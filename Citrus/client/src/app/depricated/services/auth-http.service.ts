// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthFormData } from '@models/auth-form';
// import { UserModel } from '@models/user-model';
// import { catchError, Observable, of, tap } from 'rxjs';
// import { StorageService } from './storage.service';

// @Injectable({
// 	providedIn: 'root',
// })
// export class AuthHttpService {
// 	private token: string = '';
// 	private userModel: UserModel = UserModel.Unauth;
// 	constructor(
// 		private http: HttpClient,
// 		private storage: StorageService,
// 		private router: Router,
// 	) {}

// 	login(formValue: AuthFormData): Observable<{ token: string; payload?: any }> {
// 		return this.http
// 			?.post<{ token: string; payload: any }>('/api/auth/login', formValue)
// 			.pipe(
// 				tap(({ token, payload }) => {
// 					localStorage.setItem('authToken', token);
// 					this.setToken(token);
// 					this.storage?.setIsTokenValid(true);
// 					this.storage?.setCurrentUserModel({
// 						isAdmin: payload?.admin,
// 						isAuth: true,
// 					});
// 					if (this.userModel === UserModel.Admin) {
// 						this.storage?.setIsAdmin(true);
// 					} else {
// 						this.storage?.setIsAdmin(false);
// 						this.storage?.setAuthorizedUserData({ ...payload });
// 						this.storage?.setHaveAccountFormData(true);
// 					}
// 				}),
// 			);
// 	}

// 	register(formValue: AuthFormData): Observable<{ message: string }> {
// 		return this.http?.post<{ message: string }>(
// 			'/api/auth/register',
// 			formValue,
// 		);
// 	}

// 	me(): Observable<any> {
// 		return this.http?.get<any>('/api/auth/me').pipe(
// 			tap(data => {
// 				this.storage?.setIsTokenValid(true);
// 				this.storage?.setHaveAccountFormData(true);
// 				this.storage?.setCurrentUserModel({
// 					isAdmin: data?.admin,
// 					isAuth: true,
// 				});
// 			}),
// 			catchError(() => {
// 				this.setToken('');
// 				localStorage?.clear();
// 				this.storage?.setIsTokenValid(false);
// 				this.storage?.setIsAdmin(false);
// 				this.storage?.setHaveAccountFormData(false);
// 				this.storage?.setCurrentUserModel({ isAdmin: false, isAuth: false });
// 				return of();
// 			}),
// 		);
// 	}

// 	setToken(token: string) {
// 		this.token = token;
// 	}

// 	getToken(): string {
// 		return this.token;
// 	}

// 	isAuthenticated(): boolean {
// 		return !!this.token;
// 	}

// 	logout() {
// 		this.setToken('');
// 		localStorage?.clear();
// 		this.storage?.setIsTokenValid(false);
// 		this.storage?.setIsAdmin(false);
// 		this.storage?.setHaveAccountFormData(false);
// 		this.router?.navigate(['/']);
// 		this.storage?.setCurrentUserModel({ isAdmin: false, isAuth: false });
// 	}
// }
