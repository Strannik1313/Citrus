import { Injectable } from '@angular/core';
import { AccessMap } from '@models/access-map';
import { AuthorizedClient } from '@models/authorized-client';
import { DialogWindow, DIALOG_WINDOW_INIT } from '@models/dialog-window';
import { UserModel } from '@models/user-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private isInitiallize: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private dialogTextData: BehaviorSubject<DialogWindow> =
		new BehaviorSubject<DialogWindow>(DIALOG_WINDOW_INIT);
	private isDialogWindowOpen: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	private currentUserModel: BehaviorSubject<UserModel> =
		new BehaviorSubject<UserModel>(UserModel.UNAUTH);
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
	private authorizedUserData: BehaviorSubject<AuthorizedClient> =
		new BehaviorSubject<AuthorizedClient>(new AuthorizedClient());
	private _tempArray: Array<string> = ['/'];

	isInitiallize$: Observable<boolean> = this.isInitiallize.asObservable();
	dialogTextData$: Observable<DialogWindow> =
		this.dialogTextData.asObservable();
	isDialogWindowOpen$: Observable<boolean> =
		this.isDialogWindowOpen.asObservable();
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
	authorizedUserData$: Observable<AuthorizedClient> =
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
	setAuthorizedUserData(data: AuthorizedClient): void {
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
			this.currentUserModel.next(UserModel.ADMIN);
		} else if (userFlags.isAuth) {
			this.currentUserModel.next(UserModel.AUTH);
		} else {
			this.currentUserModel.next(UserModel.UNAUTH);
		}
	}
	setInitializeStatus(status: boolean): void {
		this.isInitiallize.next(status);
	}
	openNewDialogWindow(conf: DialogWindow): void {
		this.isDialogWindowOpen.next(true);
		this.dialogTextData.next(conf);
	}
}
