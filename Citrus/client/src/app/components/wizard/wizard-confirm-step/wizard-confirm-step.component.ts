import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnInit,
} from '@angular/core';
import { FormControl, FormControlStatus, FormGroup } from '@angular/forms';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@models/client';
import { ConfirmForm } from '@models/confirm-form';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

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
		clientSurname: new FormControl(''),
		clientName: new FormControl(''),
		phoneNumber: new FormControl(''),
		email: new FormControl(''),
		comments: new FormControl(''),
	});
	clientSurname = new FormControl('');
	constructor(private storage: StorageService) {}
	ngOnInit(): void {
		this.onFormChange.emit(this.confirmForm.valueChanges);
		this.onFormValid.emit(this.confirmForm.statusChanges);
	}
	onSubmit() {
		//TODO
	}
}
