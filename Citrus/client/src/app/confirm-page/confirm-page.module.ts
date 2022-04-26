import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmLayoutComponent } from './confirm-page-wrapper/confirm-layout/confirm-layout.component';
import { RouterModule } from '@angular/router';
import { ConfirmPageWrapperComponent } from './confirm-page-wrapper/confirm-page-wrapper.component';
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
