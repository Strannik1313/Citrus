import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmLayoutComponent } from '../../components/ui/confirm-page-ui/confirm-page-layout.component';
import { RouterModule } from '@angular/router';
import { ConfirmPageWrapperComponent } from '../../components/wrappers/confirm-page-wrapper/confirm-page-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    ConfirmLayoutComponent,
    ConfirmPageWrapperComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ConfirmPageWrapperComponent }
    ])
  ]
})
export class ConfirmPageModule { }
