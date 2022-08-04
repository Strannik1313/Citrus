import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogWindowData } from '@interfaces/dialog-window-data';
import { DialogType } from '@shared/dialog-window/dialog-window.component';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { ServerErrorHandleService } from '@services/server-error-handle.service';
import { AuthHttpService } from '@services/auth-http.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	public dialogTextData: DialogWindowData = {
		windowHeaderText: '',
		windowText: '',
	};
	public isDialogActive: boolean = false;
	public isSpinnerActive: boolean = false;
	public dialogType: DialogType = DialogType.Error;
	constructor(
		private http: HttpService,
		private authHttp: AuthHttpService,
		public storage: StorageService,
		private serverErrorHandle: ServerErrorHandleService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.subscription.add(
			this.storage.isDialogWindowOpen$.subscribe(data => {
				this.isDialogActive = data;
				if (this.isDialogActive) {
					const error = this.serverErrorHandle?.getErrorInstance();
					this.dialogTextData = {
						windowHeaderText: error.status.toString(),
						windowText: error.statusText,
					};
				}
			}),
		);
		this.subscription.add(
			this.storage.isInitiallize$.subscribe(data => {
				this.isSpinnerActive = data;
				this.cdr.detectChanges();
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

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	onButtonClick(e: boolean) {
		this.storage.setIsDialogWindowOpen(false);
	}
}
