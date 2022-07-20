import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';

@Component({
	selector: 'app-account-page',
	templateUrl: './account-page-layout.component.html',
	styleUrls: ['./account-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnInit, OnChanges {
	public submitForm: FormGroup;
	public hide = true;
	@Input() disabledForm: boolean = false;
	@Input() haveAccountData: boolean = false;
	@Input() authorizedClientData: AuthorizedClientData =
		new AuthorizedClientData();
	@Output() onSaveFormValue: EventEmitter<{
		name: string;
		surname: string;
		phoneNumber: string;
	}> = new EventEmitter();

	constructor() {
		this.submitForm = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.pattern('[А-ЯЁ][а-яё]{1,}'),
			]),
			surname: new FormControl('', [
				Validators.required,
				Validators.pattern('[А-ЯЁ][а-яё]{1,}'),
			]),
			phoneNumber: new FormControl('', [
				Validators.required,
				Validators.pattern('[0-9]{9}'),
			]),
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		for (let propName in changes) {
			switch (propName) {
				case 'disabledForm':
					if (this.disabledForm) {
						this.submitForm.disable();
					} else {
						this.submitForm.enable();
					}
					break;
				default:
					break;
			}
		}
	}

	onSubmit(): void {
		this.submitForm.disable();
		this.onSaveFormValue.emit(this.submitForm.value);
	}

	ngOnInit(): void {
		if (this.haveAccountData) {
			if (!!this.authorizedClientData.name) {
				this.submitForm.setValue({
					...this.submitForm.value,
					name: this.authorizedClientData.name,
				});
			}
			if (!!this.authorizedClientData.surname) {
				this.submitForm.setValue({
					...this.submitForm.value,
					surname: this.authorizedClientData.surname,
				});
			}
			if (!!this.authorizedClientData.phoneNumber) {
				this.submitForm.setValue({
					...this.submitForm.value,
					phoneNumber: this.authorizedClientData.phoneNumber,
				});
			}
		}
	}

	getErrorMessage(inputName: string): string {
		switch (inputName) {
			case 'name': {
				if (this.submitForm.controls['name'].hasError('required')) {
					return 'Поле обязательно для заполнения';
				}
				return this.submitForm.controls['name'].hasError('pattern')
					? 'Используйте только кириллицу'
					: '';
			}
			case 'surname': {
				if (this.submitForm.controls['surname'].hasError('required')) {
					return 'Поле обязательно для заполнения';
				}
				return this.submitForm.controls['surname'].hasError('pattern')
					? 'Используйте только кириллицу'
					: '';
			}
			case 'phoneNumber': {
				if (this.submitForm.controls['phoneNumber'].hasError('required')) {
					return 'Поле обязательно для заполнения';
				}
				if (this.submitForm.controls['phoneNumber'].hasError('pattern')) {
					return 'Необходимо ввести номер телефона вместе с кодом (9 цифр)';
				}
				return this.submitForm.controls['phoneNumber']
					? 'Используйте только цифры'
					: '';
			}
			default:
				return 'Ошибка';
		}
	}
}
