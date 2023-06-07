import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthFilterComponent } from './month-filter.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [MonthFilterComponent],
	imports: [CommonModule, FormsModule, OverlayModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
	exports: [MonthFilterComponent],
})
export class MonthFilterModule {}
