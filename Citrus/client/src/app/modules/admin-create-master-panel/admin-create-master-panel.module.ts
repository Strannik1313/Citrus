import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCreateMasterPanelWrapperComponent } from 'src/app/components/wrappers/admin-create-panel-wrapper/admin-create-panel-wrapper.component';
import { AdminCreateMasterPanelComponent } from 'src/app/components/ui/admin-create-panel/admin-create-panel.component';
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
      {path: 'create-master', component: AdminCreateMasterPanelWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminCreateMasterPanelModule { }
