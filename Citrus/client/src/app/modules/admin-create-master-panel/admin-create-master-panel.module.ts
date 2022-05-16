import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCreateMasterPanelWrapperComponent } from 'src/app/components/wrappers/admin-create-master-panel-wrapper/admin-create-master-panel-wrapper.component';
import { AdminCreateMasterPanelComponent } from 'src/app/components/ui/admin-create-master-panel-ui/admin-create-master-panel-ui.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    AdminCreateMasterPanelWrapperComponent,
    AdminCreateMasterPanelComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminCreateMasterPanelWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminCreateMasterPanelModule { }
