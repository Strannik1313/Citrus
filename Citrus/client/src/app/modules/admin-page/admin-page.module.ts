import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageWrapperComponent } from 'src/app/components/wrappers/admin-page-wrapper/admin-page-wrapper.component';
import { RouterModule } from '@angular/router';
import { AdminCreateMasterPanelModule } from '../admin-create-master-panel/admin-create-master-panel.module';
import { AdminCreateServicePanelModule } from '../admin-create-service-panel/admin-create-service-panel.module';




@NgModule({
  declarations: [
    AdminPageWrapperComponent
  ],
  imports: [
    CommonModule,
    AdminCreateMasterPanelModule,
    AdminCreateServicePanelModule,
    RouterModule.forChild([
      {path: '', component: AdminPageWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPageModule { }
