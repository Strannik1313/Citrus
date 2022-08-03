import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';
import { navigateRoutes } from '@constants/navigate-routes';
import { btnLabels } from '@constants/btn-labels';
import { ChoisenService, Client } from '@interfaces/client';

const wizardStepper = {
	serviceChoice: 1,
	dateChoice: 2,
	confirmPage: 3,
	done: 4,
};

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnDestroy {
	public shouldClientDataBeSaved: boolean = false;
	public currentStep: number = wizardStepper.serviceChoice;
	public nextBtnLabel: string = btnLabels.next;
	public backBtnLabels: string = btnLabels.back;
	public isStepDone: boolean = false;
	public preselectedOptionFirstStep: number = -1;
	public clientData: Client = {
		masterId: -1,
		masterName: '',
		serviceName: '',
		serviceId: -1,
		name: '',
		surname: '',
		phoneNumber: '',
		dateOrder: null,
	};
	public wizardStepper = wizardStepper;
	private subscrition: Subscription = new Subscription();

	constructor(private router: Router, private storage: StorageService) {}

	ngOnInit(): void {
		this.clientData;
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
			masterId: -1,
			masterName: '',
			serviceName: '',
			serviceId: -1,
			name: '',
			surname: '',
			phoneNumber: '',
			dateOrder: null,
		});
	}
	firstStepDone(value: ChoisenService): void {
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
			case this.wizardStepper.serviceChoice:
				break;
			case this.wizardStepper.dateChoice:
				this.storage?.setClientData(this.clientData);
				this.nextBtnLabel = btnLabels.next;
				break;
			case this.wizardStepper.confirmPage:
				this.nextBtnLabel = btnLabels.confirm;
				break;
			case this.wizardStepper.done:
				this.router?.navigate([navigateRoutes.home]);
				break;
			default:
				this.router?.navigate([navigateRoutes.home]);
				break;
		}
	}
}
