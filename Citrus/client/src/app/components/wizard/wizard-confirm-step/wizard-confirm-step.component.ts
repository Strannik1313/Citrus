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
import { FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ClientConfirmStep } from '@models/client';
import { Observable } from 'rxjs';
import { MasterDto } from '@models/MasterDto';
import { ServiceDto } from '@models/ServiceDto';
import { Schedule } from '@models/Schedule';

@Component({
	selector: 'app-wizard-confirm-step',
	templateUrl: './wizard-confirm-step.component.html',
	styleUrls: ['./wizard-confirm-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardConfirmStepComponent implements OnInit, OnChanges {
	@Input() selectedMaster: MasterDto | null = null;
	@Input() selectedService: ServiceDto | null = null;
	@Input() selectedSchedule: Schedule | null = null;
	@Output() onFormChange: EventEmitter<Observable<ClientConfirmStep>> = new EventEmitter();
	@Output() onFormStatusChange: EventEmitter<Observable<FormControlStatus>> = new EventEmitter();
	confirmForm = new FormGroup({
		surname: new FormControl('', [Validators.required, Validators.pattern('[А-ЯЁ][а-яё]{1,}')]),
		name: new FormControl('', [Validators.required, Validators.pattern('[А-ЯЁ][а-яё]{1,}')]),
		phoneNumber: new FormControl('', [
			Validators.required,
			Validators.pattern('[+]{1,}375{1}[(]{1}[0-9]{2}[)]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}'),
		]),
		email: new FormControl('', Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')),
		comments: new FormControl(''),
	});

	ngOnInit(): void {
		this.onFormChange.emit(this.confirmForm.valueChanges);
		this.onFormStatusChange.emit(this.confirmForm.statusChanges);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!!changes.updatedPhone) {
			this.confirmForm.patchValue(
				{
					phoneNumber: changes.updatedPhone.currentValue ?? '',
				},
				{ emitEvent: false },
			);
		}
	}
}
