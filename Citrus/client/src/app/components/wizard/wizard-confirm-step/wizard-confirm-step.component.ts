import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnInit,
} from '@angular/core';
import {
	FormControl,
	FormControlStatus,
	FormGroup,
	Validators,
} from '@angular/forms';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@models/client';
import { ConfirmForm } from '@models/confirm-form';
import { StorageService } from '@services/storage.service';
import { filter, Observable } from 'rxjs';

@Component({
	selector: 'app-wizard-confirm-step',
	templateUrl: './wizard-confirm-step.component.html',
	styleUrls: ['./wizard-confirm-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardConfirmStepComponent implements OnInit {
	@Input() client: Client | null = CLIENT_INIT_VALUE;
	@Output() onFormChange: EventEmitter<Observable<ConfirmForm>> =
		new EventEmitter();
	@Output() onFormValid: EventEmitter<Observable<FormControlStatus>> =
		new EventEmitter();
	confirmForm = new FormGroup({
		clientSurname: new FormControl('', [
			Validators.required,
			Validators.pattern('[А-ЯЁ][а-яё]{1,}'),
		]),
		clientName: new FormControl('', [
			Validators.required,
			Validators.pattern('[А-ЯЁ][а-яё]{1,}'),
		]),
		phoneNumber: new FormControl('', [
			Validators.required,
			Validators.pattern(
				'[+]{1,}375{1}[(]{1}[0-9]{2}[)]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}',
			),
		]),
		email: new FormControl(
			'',
			Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
		),
		comments: new FormControl(''),
	});
	clientSurname = new FormControl('');
	constructor(private storage: StorageService) {}
	ngOnInit(): void {
		this.onFormChange.emit(this.confirmForm.valueChanges);
		this.confirmForm.valueChanges
			.pipe(
				filter(formvalue => {
					// console.log(formvalue['phoneNumber'].includes('+375('))
					return (
						this.confirmForm.valid && formvalue['phoneNumber'].includes('+375(')
					);
				}),
			)
			.subscribe(data => {
				// console.log(data)
			});
	}
	onInputFocus(): void {
		this.confirmForm.patchValue({ phoneNumber: '+375(' });
	}
	onSubmit() {
		//TODO
	}
}
