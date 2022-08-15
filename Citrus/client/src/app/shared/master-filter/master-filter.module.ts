import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterFilterComponent } from '@shared/master-filter/master-filter.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [MasterFilterComponent],
	imports: [CommonModule, OverlayModule],
	exports: [MasterFilterComponent],
})
export class MasterFilterModule {}
