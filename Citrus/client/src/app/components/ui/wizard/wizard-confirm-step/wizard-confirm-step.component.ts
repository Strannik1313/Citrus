import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterDto } from '@models/MasterDto';
import { ServiceDto } from '@models/ServiceDto';
import { Schedule } from '@interfaces/Schedule';
import { ConfirmForm } from '@interfaces/ConfirmForm';
import { VALIDATIONS_ERROR } from '@enums/ValidationErrors';
import { LABELS } from '@enums/labels/Labels';
import { BUTTON_LABELS } from '@enums/labels/ButtonLabels';

@Component({
	selector: 'app-wizard-confirm-step',
	templateUrl: './wizard-confirm-step.component.html',
	styleUrls: ['./wizard-confirm-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardConfirmStepComponent {
	@Input() selectedMaster: MasterDto | null = null;
	@Input() selectedService: ServiceDto | null = null;
	@Input() selectedSchedule: Schedule | null = null;
	@Output() onFormSubmit: EventEmitter<ConfirmForm> = new EventEmitter();
	validationErrors: typeof VALIDATIONS_ERROR = VALIDATIONS_ERROR;
	labels: typeof LABELS = LABELS;
	btn_labels: typeof BUTTON_LABELS = BUTTON_LABELS;
	confirmForm = new FormGroup({
		surname: new FormControl('', [Validators.required, Validators.pattern('[А-ЯЁ][а-яё]{1,}')]),
		name: new FormControl('', [Validators.required, Validators.pattern('[А-ЯЁ][а-яё]{1,}')]),
		phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/\d/g)]),
		email: new FormControl('', Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')),
		comments: new FormControl(''),
	});

	onSubmit() {
		this.onFormSubmit.emit(this.confirmForm.value as ConfirmForm);
	}
}
