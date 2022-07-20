import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountPageWrapperComponent } from '../../components/wrappers/account-page-wrapper/account-page-wrapper.component';
import { AccountPageComponent } from '../../components/ui/account-page-ui/account-page-layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderCardModule } from 'src/app/shared/order-card/order-card.module';

@NgModule({
	declarations: [AccountPageComponent, AccountPageWrapperComponent],
	imports: [
		CommonModule,
		OrderCardModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatSnackBarModule,
		RouterModule.forChild([
			{ path: '', component: AccountPageWrapperComponent },
		]),
	],
	exports: [RouterModule],
})
export class AccountPageModule {}
