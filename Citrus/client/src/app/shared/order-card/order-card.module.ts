import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderCardComponent } from '@shared/order-card/order-card.component';

@NgModule({
	declarations: [OrderCardComponent],
	imports: [
		CommonModule,
		MatPaginatorModule,
		MatSelectModule,
		MatCardModule,
		MatButtonModule,
	],
	exports: [OrderCardComponent],
})
export class OrderCardModule {}
