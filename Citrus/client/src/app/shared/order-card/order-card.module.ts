import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './order-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    OrderCardComponent
  ]
})
export class OrderCardModule { }
