import { ComponentPortal } from '@angular/cdk/portal';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { WizardFirstStepComponent } from '@components/wizard/wizard-first-step/wizard-first-step.component';
import { WizardSecondStepComponent } from '@components/wizard/wizard-second-step/wizard-second-step.component';
import { WizardThirdStepComponent } from '@components/wizard/wizard-third-step/wizard-third-step.component';
import { WizardStepper } from '@models/wizard-stepper';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnDestroy {
	public selectedPortal: ComponentPortal<any>;
	public currentStep: number = WizardStepper.WizardFirstStepComponent;
	public nextBtnLabel: string = 'Далее';
	public isStepDone: boolean = false;
	private subscritions: Subscription[] = [];
	private firstStepComponent: ComponentPortal<WizardFirstStepComponent>;
	private secondStepComponent: ComponentPortal<WizardSecondStepComponent>;
	private thirdStepComponent: ComponentPortal<WizardThirdStepComponent>;

	constructor(
		private router: Router,
		private storage: StorageService,
		private cdr: ChangeDetectorRef,
	) {
		this.firstStepComponent = new ComponentPortal(WizardFirstStepComponent);
		this.secondStepComponent = new ComponentPortal(WizardSecondStepComponent);
		this.thirdStepComponent = new ComponentPortal(WizardThirdStepComponent);
		this.selectedPortal = this.firstStepComponent;
	}

	ngOnInit(): void {
		this.subscritions.push(
			this.storage.isWizardStepDone$.subscribe(data => {
				this.isStepDone = data;
				this.cdr.detectChanges();
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscritions.forEach(sub => sub.unsubscribe());
	}

	onBtnClick(action: boolean): void {
		action ? (this.currentStep += 1) : (this.currentStep -= 1);
		switch (this.currentStep) {
			case WizardStepper.WizardFirstStepComponent:
				this.selectedPortal = this.firstStepComponent;
				break;
			case WizardStepper.WizardSecondStepComponent:
				this.selectedPortal = this.secondStepComponent;
				this.nextBtnLabel = 'Далее';
				break;
			case WizardStepper.WizardThirdStepComponent:
				this.selectedPortal = this.thirdStepComponent;
				this.nextBtnLabel = 'Подтвердить';
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
