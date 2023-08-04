import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthFormType } from '@enums/AuthFormType';
import { AuthPageLabels } from '@enums/labels/AuthPageLabels';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthForm } from '@interfaces/AuthForm';

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
	@Input() type: AuthFormType = AuthFormType.NONE;
	@Output() onFormSubmit: EventEmitter<AuthForm> = new EventEmitter<AuthForm>();

	readonly AuthFormType = AuthFormType;
	readonly AuthPageLabels = AuthPageLabels;

	authForm: FormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	onSubmit() {
		this.onFormSubmit.emit(this.authForm.value as AuthForm);
	}
}
