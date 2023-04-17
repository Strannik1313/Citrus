import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterPageWrapperComponent } from '@components/register-page-wrapper/register-page-wrapper.component';
import { AuthFormModule } from '@shared/auth-form/auth-form.module';

@NgModule({
	declarations: [RegisterPageWrapperComponent],
	imports: [
		CommonModule,
		AuthFormModule,
		RouterModule.forChild([{ path: '', component: RegisterPageWrapperComponent }]),
	],
	exports: [RouterModule],
})
export class RegisterPageModule {}
