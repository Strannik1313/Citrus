import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountPageWrapperComponent } from './account-page-wrapper/account-page-wrapper.component';
import { AccountPageComponent } from './account-page-wrapper/account-page-layout/account-page.component';
import {MatCardModule} from '@angular/material/card'



@NgModule({
  declarations: [
    AccountPageComponent,
    AccountPageWrapperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {path: '', component: AccountPageWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountPageModule { }
