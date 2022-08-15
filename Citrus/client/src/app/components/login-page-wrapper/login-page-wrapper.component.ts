import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthForm } from '@models/auth-form';
import { AuthHttpService } from '@services/auth-http.service';
import { finalize, Subscription } from 'rxjs';

@Component({
	selector: 'app-login-page-wrapper',
	templateUrl: './login-page-wrapper.component.html',
	styleUrls: ['./login-page-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageWrapperComponent implements OnDestroy {
	private subscriptions: Subscription[] = [];
	public disabledForm = false;
	constructor(private router: Router, private authHttp: AuthHttpService) {}

	onSafeFormValue(e: AuthForm): void {
		this.disabledForm = true;
		this.subscriptions.push(
			this.authHttp
				.login(e)
				?.pipe(
					finalize(() => {
						this.disabledForm = false;
					}),
				)
				.subscribe(() => {
					this.router.navigate(['/']);
				}),
		);
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
}
