import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '@components/ui/spinner/component/spinner.component';
import { SpinnerDirective } from '@components/ui/spinner/directive/spinner.directive';

@NgModule({
	declarations: [SpinnerComponent, SpinnerDirective],
	imports: [CommonModule, MatProgressSpinnerModule],
	exports: [SpinnerComponent, SpinnerDirective],
})
export class SpinnerModule {}
