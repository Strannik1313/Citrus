import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ClientData } from '@models/client-data';
import { WizardStepper } from '@models/wizard-stepper';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';

const enum BtnLabel {
	next = 'Далее',
	confirm = 'Подтвердить',
}

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnDestroy {
	public shouldClientDataBeSaved: boolean = false;
	public currentStep: number = WizardStepper.WizardFirstStepComponent;
	public nextBtnLabel: string = BtnLabel.next;
	public isStepDone: boolean = false;
	public preselectedOptionFirstStep: number = -1;
	public clientData: ClientData = new ClientData();
	public firstStepComponent: number = WizardStepper.WizardFirstStepComponent;
	public secondStepComponent: number = WizardStepper.WizardSecondStepComponent;
	public thirdStepComponent: number = WizardStepper.WizardThirdStepComponent;
	private subscritions: Subscription[] = [];

	constructor(
		private router: Router,
		private storage: StorageService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.subscritions.push(
			this.storage.isWizardStepDone$.subscribe(data => {
				this.isStepDone = data;
				this.cdr.markForCheck();
			}),
		);
		this.subscritions.push(
			this.storage.shouldClientDataSaved$.subscribe(data => {
				this.shouldClientDataBeSaved = data;
			}),
		);
		this.subscritions.push(
			this.storage.clientData$.subscribe(data => {
				this.clientData = data;
				this.preselectedOptionFirstStep = this.clientData.serviceId;
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscritions.forEach(sub => sub.unsubscribe());
	}
	onBtnClick(action: boolean): void {
		if (action) {
			this.currentStep += 1;
			this.storage.setClientDataSaved(true);
		} else {
			this.currentStep -= 1;
			this.storage.setClientDataSaved(false);
		}
		this.storage.setIsWizardStepDone(false);
		switch (this.currentStep) {
			case WizardStepper.WizardFirstStepComponent:
				break;
			case WizardStepper.WizardSecondStepComponent:
				this.nextBtnLabel = BtnLabel.next;
				break;
			case WizardStepper.WizardThirdStepComponent:
				this.nextBtnLabel = BtnLabel.confirm;
				break;
			case WizardStepper.WizardConfirm:
				this.router.navigate(['/']);
				break;
			default:
				this.router.navigate(['/']);
				break;
		}
	}
}
