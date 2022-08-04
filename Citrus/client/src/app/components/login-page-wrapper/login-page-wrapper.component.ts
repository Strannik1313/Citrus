import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormData } from '@models/auth-form-data';
import { AuthHttpService } from '@services/auth-http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login-page-wrapper',
	templateUrl: './login-page-wrapper.component.html',
	styleUrls: ['./login-page-wrapper.component.scss'],
})
export class LoginPageWrapperComponent implements OnDestroy {
	private subscriptions: Subscription[] = [];
	public disabledForm: boolean = false;

	constructor(private router: Router, private authHttp: AuthHttpService) {}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	disableForm(value: boolean): boolean {
		return (this.disabledForm = value);
	}

	onSafeFormValue(e: AuthFormData): void {
		this.disableForm(true);
		this.subscriptions.push(
			this.authHttp.login(e)?.subscribe({
				next: data => {
					if (data.payload.admin) {
						this.router.navigate(['/']);
					} else {
						this.router.navigate(['/']);
					}
				},
				error: error => {
					this.disableForm(false);
				},
			}),
		);
	}
}
