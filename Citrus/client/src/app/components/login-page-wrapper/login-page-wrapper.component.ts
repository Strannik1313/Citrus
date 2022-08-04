import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormData } from '@models/auth-form-data';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login-page-wrapper',
	templateUrl: './login-page-wrapper.component.html',
	styleUrls: ['./login-page-wrapper.component.scss'],
})
export class LoginPageWrapperComponent implements OnDestroy {
	private subscriptions: Subscription[] = [];
	public disabledForm: boolean = false;

	constructor(private http: HttpService, private router: Router) {}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	disableForm(value: boolean): boolean {
		return (this.disabledForm = value);
	}

	onSafeFormValue(e: AuthFormData): void {
		this.disableForm(true);
		this.subscriptions.push(
			this.http?.login(e)?.subscribe({
				next: data => {
					if (data.payload.admin) {
						this.router?.navigate(['/']);
					} else {
						this.router?.navigate(['/']);
					}
				},
				error: error => {
					this.disableForm(false);
				},
			}),
		);
	}
}
