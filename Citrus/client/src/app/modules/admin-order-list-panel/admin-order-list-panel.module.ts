import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AdminOrderListPanelWrapperComponent } from 'src/app/components/wrappers/admin-order-list-panel-wrapper/admin-order-list-panel-wrapper.component';
import { AdminOrderListPanelUiComponent } from 'src/app/components/ui/admin-order-list-panel-ui/admin-order-list-panel-ui.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AdminOrderListPanelWrapperComponent,
    AdminOrderListPanelUiComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: '', component: AdminOrderListPanelWrapperComponent}
    ])
  ]
})
export class AdminOrderListPanelModule { }
