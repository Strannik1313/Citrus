import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterCardComponent } from '@shared/master-card/master-card.component';

@NgModule({
	declarations: [MasterCardComponent],
	imports: [CommonModule],
	exports: [MasterCardComponent],
})
export class MasterCardModule {}
