import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFormType } from '@enums/AuthFormType';
import { Store } from '@ngrx/store';
import { login, register } from '@state-management/auth-feature/auth.actions';
import { AuthForm } from '@interfaces/AuthForm';
import { Observable } from 'rxjs';
import { selectAuthForm } from '@state-management/auth-feature/auth.reducer';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth-page.component.html',
	styleUrls: ['./auth-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
	authForm$: Observable<AuthFormType> = new Observable<AuthFormType>();
	readonly AuthFormType = AuthFormType;

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.authForm$ = this.store.select(selectAuthForm);
	}

	onFormSubmit(authForm: AuthForm, type: AuthFormType) {
		if (type === AuthFormType.LOGIN) this.store.dispatch(login({ payload: authForm }));
		if (type === AuthFormType.REGISTER) this.store.dispatch(register({ payload: authForm }));
	}
}
