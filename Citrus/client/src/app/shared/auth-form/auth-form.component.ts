import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthForm } from '@models/auth-form';

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnChanges {
	public submitForm: FormGroup;
	public hide = true;
	@Input() disabledForm: boolean = false;
	@Output() onSafeFormValue: EventEmitter<AuthForm> = new EventEmitter();

	constructor() {
		this.submitForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					'[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
				),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(5),
			]),
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['disabledForm'].currentValue) {
			this.submitForm.disable();
		} else {
			this.submitForm.enable();
		}
	}

	onSubmit() {
		this.submitForm.disable();
		this.onSafeFormValue.emit(this.submitForm.value);
	}

	getErrorMessage(inputName: string) {
		switch (inputName) {
			case 'email': {
				if (this.submitForm.controls['email'].hasError('required')) {
					return 'Поле обязательно для заполнения';
				}
				return this.submitForm.controls['email'].hasError('pattern')
					? 'Введите корректный email'
					: '';
			}
			case 'password': {
				if (this.submitForm.controls['password'].hasError('required')) {
					return 'Поле обязательно для заполнения';
				}
				return this.submitForm.controls['password'].hasError('minlength')
					? 'Минимальное количество символов - 5'
					: '';
			}
			default:
				return 'Ошибка';
		}
	}
}
