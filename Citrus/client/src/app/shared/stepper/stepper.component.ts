import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
	@Input() currentStep: number = 1;
	@Input() stepsQuantity: Array<number> = [];
	trackByFn(index: number, item: number): number {
		return item;
	}
}
