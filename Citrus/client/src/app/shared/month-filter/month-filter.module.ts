import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthFilterComponent } from './month-filter.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [MonthFilterComponent],
	imports: [CommonModule, OverlayModule],
	exports: [MonthFilterComponent],
})
export class MonthFilterModule {}
