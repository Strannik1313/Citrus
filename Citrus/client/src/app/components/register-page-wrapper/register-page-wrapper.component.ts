import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthForm } from '@models/auth-form';
import { AuthHttpService } from '@services/auth-http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register-page-wrapper',
	templateUrl: './register-page-wrapper.component.html',
	styleUrls: ['./register-page-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageWrapperComponent implements OnDestroy {
	public disabledForm = false;
	private subscription: Subscription[] = [];
	constructor(private router: Router, private authHttp: AuthHttpService) {}
	disableForm(value: boolean): boolean {
		return (this.disabledForm = value);
	}
	onSafeFormValue(formValue: AuthForm): void {
		this.disabledForm = true;
		this.subscription.push(
			this.authHttp.register(formValue).subscribe({
				next: () => {
					this.router.navigate(['/login']);
				},
				error: error => {
					this.disabledForm = false;
				},
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.forEach(sub => {
			sub.unsubscribe();
		});
	}
}
