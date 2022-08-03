import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
	ClientData,
	ClientDataFirstStepInit,
	ClientDataSecondStepInit,
} from '@models/client-data';
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
	private subscrition: Subscription = new Subscription();

	constructor(private router: Router, private storage: StorageService) {}

	ngOnInit(): void {
		this.subscrition?.add(
			this.storage?.clientData$?.subscribe(data => {
				this.clientData = data;
				this.preselectedOptionFirstStep = this.clientData?.serviceId;
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscrition?.unsubscribe();
		this.storage?.setClientData({
			...new ClientData(),
		});
	}
	firstStepDone(value: ClientDataFirstStepInit): void {
		this.clientData = { ...this.clientData, ...value };
		this.isStepDone = true;
	}
	onBtnClick(action: boolean): void {
		if (action) {
			this.currentStep += 1;
		} else {
			this.currentStep -= 1;
		}
		this.isStepDone = false;
		switch (this.currentStep) {
			case WizardStepper.WizardFirstStepComponent:
				this.clientData = {
					...this.clientData,
					...(action && new ClientDataFirstStepInit()),
				};
				break;
			case WizardStepper.WizardSecondStepComponent:
				this.clientData = {
					...this.clientData,
					...(action && new ClientDataSecondStepInit()),
				};
				this.storage?.setClientData(this.clientData);
				this.nextBtnLabel = BtnLabel.next;
				break;
			case WizardStepper.WizardThirdStepComponent:
				this.nextBtnLabel = BtnLabel.confirm;
				break;
			case WizardStepper.WizardConfirm:
				this.router?.navigate(['/']);
				break;
			default:
				this.router?.navigate(['/']);
				break;
		}
	}
}
