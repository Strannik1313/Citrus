import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';
import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { BTN_LABELS } from '@constants/btn-labels';
import { ChoisenService, Client } from '@interfaces/client';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';

const WIZARD_STEPPER = {
	serviceChoice: 1,
	dateChoice: 2,
	confirmPage: 3,
	done: 4,
};
const STEPS_QUATITY = [1, 2, 3];

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnDestroy {
	private subscrition: Subscription = new Subscription();
	public stepsQuantity: Array<number> = STEPS_QUATITY;
	public wizardStepper = WIZARD_STEPPER;
	public currentStep: number = this.wizardStepper.serviceChoice;
	public nextBtnLabel: string = BTN_LABELS.next;
	public backBtnLabels: string = BTN_LABELS.back;
	public isStepDone: boolean = false;
	public client: Client = CLIENT_INIT_VALUE;

	constructor(private router: Router, private storage: StorageService) {}

	ngOnInit(): void {
		this.client;
		this.subscrition.add(
			this.storage.client$.subscribe(data => {
				this.client = { ...data };
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscrition.unsubscribe();
		this.storage.resetClient();
	}
	firstStepDone(value: ChoisenService): void {
		this.client = { ...this.client, ...value };
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
			case this.wizardStepper.serviceChoice:
				break;
			case this.wizardStepper.dateChoice:
				this.storage.setClient(this.client);
				this.nextBtnLabel = BTN_LABELS.next;
				break;
			case this.wizardStepper.confirmPage:
				this.nextBtnLabel = BTN_LABELS.confirm;
				break;
			case this.wizardStepper.done:
				this.router.navigate([NAVIGATE_ROUTES.home]);
				break;
			default:
				this.router.navigate([NAVIGATE_ROUTES.home]);
				break;
		}
	}
}
