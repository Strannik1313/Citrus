import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageWrapperComponent } from 'src/app/components/wrappers/admin-page-wrapper/admin-page-wrapper.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NavigateAccess } from 'src/app/services/navigate-access.service';




@NgModule({
  declarations: [
    AdminPageWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminPageWrapperComponent},
      {
        path: 'create-service',
        loadChildren: () => import('../admin-create-service-panel/admin-create-service-panel.module')
          .then(m => m.AdminCreateServicePanelModule),
          canActivate: [AuthGuardService, NavigateAccess]
      },
      {
        path: 'create-master',
        loadChildren: () => import('../admin-create-master-panel/admin-create-master-panel.module')
          .then(m => m.AdminCreateMasterPanelModule),
          canActivate: [AuthGuardService, NavigateAccess]
      },
      {
        path: 'order-list',
        loadChildren: () => import('../admin-order-list-panel/admin-order-list-panel.module')
          .then(m => m.AdminOrderListPanelModule),
          canActivate: [AuthGuardService, NavigateAccess]
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPageModule { }
