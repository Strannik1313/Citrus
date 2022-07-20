import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AuthFormData } from 'src/app/models/auth-form-data';

@Component({
	selector: 'app-register-page-wrapper',
	templateUrl: './register-page-wrapper.component.html',
	styleUrls: ['./register-page-wrapper.component.scss'],
})
export class RegisterPageWrapperComponent implements OnDestroy {
	private subscription: Subscription[] = [];
	disabledForm: boolean = false;
	constructor(private http: HttpService, private router: Router) {}

	ngOnDestroy(): void {
		this.subscription.forEach(sub => {
			sub.unsubscribe();
		});
	}

	disableForm(value: boolean): boolean {
		return (this.disabledForm = value);
	}

	onSafeFormValue(e: AuthFormData): void {
		this.disableForm(true);
		this.subscription.push(
			this.http?.register(e)?.subscribe({
				next: () => {
					this.router.navigate(['/login']);
				},
				error: error => {
					this.disableForm(false);
				},
			}),
		);
	}
}
