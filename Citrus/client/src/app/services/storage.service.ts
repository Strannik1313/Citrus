import { Injectable } from '@angular/core';
import { Client } from '@interfaces/client';
import { AccessMap } from '@models/access-map';
import { AuthorizedClientData } from '@models/authorized-client-data';
import { UserModel } from '@models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private isDialogWindowOpen: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private isInitiallize: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private currentUserModel: BehaviorSubject<UserModel> =
		new BehaviorSubject<UserModel>(UserModel.Unauth);
	private isButtonDisabled: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private haveAccountData: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private isTokenValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false,
	);
	private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false,
	);
	private authButtonActive: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private isBackButtonDisabled: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(true);
	private accessMap: BehaviorSubject<AccessMap> =
		new BehaviorSubject<AccessMap>(new AccessMap());
	private clientData: BehaviorSubject<Client> = new BehaviorSubject<Client>({
		masterId: -1,
		masterName: '',
		serviceName: '',
		serviceId: -1,
		name: '',
		surname: '',
		phoneNumber: '',
		dateOrder: null,
	});
	private authorizedUserData: BehaviorSubject<AuthorizedClientData> =
		new BehaviorSubject<AuthorizedClientData>(new AuthorizedClientData());
	private _tempArray: Array<string> = ['/'];

	isDialogWindowOpen$: Observable<boolean> =
		this.isDialogWindowOpen.asObservable();
	isInitiallize$: Observable<boolean> = this.isInitiallize.asObservable();
	currentUserModel$: Observable<UserModel> =
		this.currentUserModel.asObservable();
	buttonStatus$: Observable<boolean> = this.isButtonDisabled.asObservable();
	haveAccountData$: Observable<boolean> = this.haveAccountData.asObservable();
	isTokenValid$: Observable<boolean> = this.isTokenValid.asObservable();
	isAdmin$: Observable<boolean> = this.isAdmin.asObservable();
	authButtonActive$: Observable<boolean> = this.authButtonActive.asObservable();
	backButtonDisabled$: Observable<boolean> =
		this.isBackButtonDisabled.asObservable();
	accessMap$: Observable<AccessMap> = this.accessMap.asObservable();
	clientData$: Observable<Client> = this.clientData.asObservable();
	authorizedUserData$: Observable<AuthorizedClientData> =
		this.authorizedUserData.asObservable();

	setAccessMap(url: string): void {
		switch (url) {
			case '/': {
				this.accessMap.next({
					...this.accessMap.value,
					loginPage: true,
					registerPage: true,
					accountPage: false,
					wizard: false,
				});
				break;
			}
			case '/account': {
				this.accessMap.next({
					...this.accessMap.value,
					loginPage: true,
					registerPage: true,
					accountPage: true,
					wizard: false,
				});
				break;
			}
			case '/deal': {
				this.accessMap.next({
					...this.accessMap.value,
					loginPage: true,
					registerPage: true,
					accountPage: true,
					wizard: true,
				});
				break;
			}
		}
	}

	setClientData(value: Client): void {
		this.clientData.next(value);
	}

	setAuthorizedUserData(data: AuthorizedClientData): void {
		this.authorizedUserData.next({
			...data,
		});
	}

	setHaveAccountFormData(data: boolean): void {
		this.haveAccountData.next(data);
	}

	setIsTokenValid(value: boolean): void {
		this.isTokenValid.next(value);
	}

	setIsAdmin(value: boolean): void {
		this.isAdmin.next(value);
	}
	setIsDialogWindowOpen(value: boolean): void {
		this.isDialogWindowOpen.next(value);
	}
	setCurrentUserModel(userFlags: { isAdmin: boolean; isAuth: boolean }): void {
		if (userFlags.isAdmin) {
			this.currentUserModel.next(UserModel.Admin);
		} else if (userFlags.isAuth) {
			this.currentUserModel.next(UserModel.Auth);
		} else {
			this.currentUserModel.next(UserModel.Unauth);
		}
	}
	setInitializeStatus(status: boolean): void {
		this.isInitiallize.next(status);
	}
}
