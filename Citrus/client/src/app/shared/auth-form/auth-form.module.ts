import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthFormComponent } from '@shared/auth-form/auth-form.component';

@NgModule({
	declarations: [AuthFormComponent],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
	],
	exports: [AuthFormComponent],
})
export class AuthFormModule {}
