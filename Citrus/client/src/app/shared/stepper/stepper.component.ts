import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

const stepper = {
	one: 1,
	two: 2,
	three: 3,
};

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
	@Input() currentStep: number = stepper.one;
	public steps: Array<number> = [stepper.one, stepper.two, stepper.three];
	trackByFn(index: number, item: number): number {
		return item;
	}
}
