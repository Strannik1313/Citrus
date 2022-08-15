import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DialogWindow } from '@models/dialog-window';
import { DialogType } from '@shared/dialog-window/dialog-window.component';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { ServerErrorHandleService } from '@services/server-error-handle.service';
import { AuthHttpService } from '@services/auth-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	isLoading$: Observable<boolean> = this.storage.isInitiallize$;
	isModalOpen$: Observable<boolean> = this.storage.isDialogWindowOpen$;
	private subscription: Subscription = new Subscription();
	public dialogTextData: DialogWindow = {
		windowHeaderText: '',
		windowText: '',
	};
	public dialogType: DialogType = DialogType.Error;
	constructor(
		private http: HttpService,
		private authHttp: AuthHttpService,
		public storage: StorageService,
		private serverErrorHandle: ServerErrorHandleService,
	) {}

	ngOnInit(): void {
		this.subscription.add(
			this.storage.isDialogWindowOpen$.subscribe(data => {
				if (data) {
					const error: HttpErrorResponse =
						this.serverErrorHandle?.getErrorInstance();
					this.dialogTextData = {
						windowHeaderText: error?.status.toString() ?? 'default',
						windowText: error?.statusText ?? 'default',
					};
				}
			}),
		);

		const potentialToken = localStorage.getItem('authToken');
		if (potentialToken !== null) {
			this.authHttp.setToken(potentialToken);
			this.subscription.add(
				this.authHttp.me().subscribe(data => {
					if (data) {
						this.storage.setAuthorizedUserData(data);
					}
				}),
			);
		}
	}

	onButtonClick(e: boolean) {
		this.storage.setIsDialogWindowOpen(false);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
