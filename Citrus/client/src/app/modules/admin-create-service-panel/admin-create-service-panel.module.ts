import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { AdminCreateServicePanelWrapperComponent } from 'src/app/components/wrappers/admin-create-service-panel-wrapper/admin-create-service-panel-wrapper.component';
import { AdminCreateServicePanelUiComponent } from 'src/app/components/ui/admin-create-service-panel-ui/admin-create-service-panel-ui.component';




@NgModule({
  declarations: [
    AdminCreateServicePanelWrapperComponent,
    AdminCreateServicePanelUiComponent

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: '', component: AdminCreateServicePanelWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminCreateServicePanelModule { }
