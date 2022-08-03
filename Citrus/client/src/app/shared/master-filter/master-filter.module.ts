import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterFilterComponent } from '@shared/master-filter/master-filter.component';

@NgModule({
	declarations: [MasterFilterComponent],
	imports: [CommonModule],
	exports: [MasterFilterComponent],
})
export class MasterFilterModule {}
