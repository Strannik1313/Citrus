import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '@shared/stepper/stepper.component';

@NgModule({
	declarations: [StepperComponent],
	imports: [CommonModule],
	exports: [StepperComponent],
})
export class StepperModule {}
