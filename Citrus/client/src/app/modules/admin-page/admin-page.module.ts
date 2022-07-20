import { MatListModule } from '@angular/material/list';
import { AdminOrderListPanelWrapperComponent } from 'src/app/components/wrappers/admin-order-list-panel-wrapper/admin-order-list-panel-wrapper.component';
import { AdminOrderListPanelUiComponent } from 'src/app/components/ui/admin-order-list-panel-ui/admin-order-list-panel-ui.component';
import { AdminCreateServicePanelUiComponent } from './../../components/ui/admin-create-service-panel-ui/admin-create-service-panel-ui.component';
import { AdminCreateServicePanelWrapperComponent } from 'src/app/components/wrappers/admin-create-service-panel-wrapper/admin-create-service-panel-wrapper.component';
import { MatInputModule } from '@angular/material/input';
import { AdminCreateMasterPanelComponent } from 'src/app/components/ui/admin-create-master-panel-ui/admin-create-master-panel-ui.component';
import { AdminCreateMasterPanelWrapperComponent } from 'src/app/components/wrappers/admin-create-master-panel-wrapper/admin-create-master-panel-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderCardModule } from 'src/app/shared/order-card/order-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageWrapperComponent } from 'src/app/components/wrappers/admin-page-wrapper/admin-page-wrapper.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [
		AdminPageWrapperComponent,
		AdminCreateMasterPanelWrapperComponent,
		AdminCreateMasterPanelComponent,
		AdminCreateServicePanelWrapperComponent,
		AdminCreateServicePanelUiComponent,
		AdminOrderListPanelWrapperComponent,
		AdminOrderListPanelUiComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatPaginatorModule,
		MatSelectModule,
		MatListModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		OrderCardModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: AdminPageWrapperComponent }]),
	],
	exports: [RouterModule],
})
export class AdminPageModule {}
