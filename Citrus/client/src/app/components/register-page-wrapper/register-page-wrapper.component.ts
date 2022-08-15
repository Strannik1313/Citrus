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
	private disabledForm = false;
	private subscription: Subscription[] = [];
	constructor(private router: Router, private authHttp: AuthHttpService) {}
	disableForm(value: boolean): boolean {
		return (this.disabledForm = value);
	}
	onSafeFormValue(e: AuthForm): void {
		this.disableForm(true);
		this.subscription.push(
			this.authHttp.register(e).subscribe({
				next: () => {
					this.router.navigate(['/login']);
				},
				error: error => {
					this.disableForm(false);
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
