import { Injectable } from '@angular/core';
import { AccessMap } from '@models/access-map';
import { AuthorizedClientData } from '@models/authorized-client-data';
import { ClientData } from '@models/client-data';
import { UserModel } from '@models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private isDialogWindowOpen: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private isWizardStepDone: BehaviorSubject<boolean> =
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
	private isClientDataShouldSaved: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(true);
	private isBackButtonDisabled: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(true);
	private accessMap: BehaviorSubject<AccessMap> =
		new BehaviorSubject<AccessMap>(new AccessMap());
	private clientData: BehaviorSubject<ClientData> =
		new BehaviorSubject<ClientData>(new ClientData());
	private authorizedUserData: BehaviorSubject<AuthorizedClientData> =
		new BehaviorSubject<AuthorizedClientData>(new AuthorizedClientData());
	private _tempArray: Array<string> = ['/'];

	isDialogWindowOpen$: Observable<boolean> =
		this.isDialogWindowOpen.asObservable();
	isWizardStepDone$: Observable<boolean> = this.isWizardStepDone.asObservable();
	isInitiallize$: Observable<boolean> = this.isInitiallize.asObservable();
	currentUserModel$: Observable<UserModel> =
		this.currentUserModel.asObservable();
	buttonStatus$: Observable<boolean> = this.isButtonDisabled.asObservable();
	haveAccountData$: Observable<boolean> = this.haveAccountData.asObservable();
	isTokenValid$: Observable<boolean> = this.isTokenValid.asObservable();
	isAdmin$: Observable<boolean> = this.isAdmin.asObservable();
	authButtonActive$: Observable<boolean> = this.authButtonActive.asObservable();
	shouldClientDataSaved$: Observable<boolean> =
		this.isClientDataShouldSaved.asObservable();
	backButtonDisabled$: Observable<boolean> =
		this.isBackButtonDisabled.asObservable();
	accessMap$: Observable<AccessMap> = this.accessMap.asObservable();
	clientData$: Observable<ClientData> = this.clientData.asObservable();
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

	setClientData(action: any): void {
		switch (action.name) {
			case 'master': {
				this.clientData.next({
					...this.clientData.value,
					master: action.value,
					masterId: action.id,
				});
				break;
			}
			case 'services': {
				this.clientData.next({
					...this.clientData.value,
					service: action.value,
					serviceId: action.id,
				});
				break;
			}
			case 'calendar': {
				this.clientData.next({
					...this.clientData.value,
					masterId: action.id,
					master: action.masterName,
					date: action.date,
					time: {
						hour: action.hour,
						minute: action.minute,
					},
				});
				break;
			}
			case 'confirm': {
				this.clientData.next({
					...this.clientData.value,
					name: action.clientName,
					surname: action.clientSurname,
					phoneNumber: action.phoneNumber,
					comments: action.comments ? action.comments : '',
				});
				break;
			}
			case 'admin': {
				this.clientData.next({
					...this.clientData.value,
					master: action.master,
					masterId: action.masterId,
					service: action.service,
					name: action.clientName,
					surname: action.clientSurname,
					phoneNumber: action.phoneNumber,
					comments: action.comments ? action.comments : '',
				});
				break;
			}
			case 'home': {
				this.clientData.next({
					...this.clientData.value,
					master: action.master,
					masterId: action.masterId,
					service: action.service,
					date: action.date,
					time: {
						hour: action.hour,
						minute: action.minute,
					},
				});
				break;
			}
		}
	}

	setClientDataSaved(value: boolean): void {
		this.isClientDataShouldSaved.next(value);
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
	setIsWizardStepDone(status: boolean): void {
		this.isWizardStepDone.next(status);
	}
}
