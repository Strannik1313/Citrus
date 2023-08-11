import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { AuthFeature } from '@state-management/auth-feature/auth.reducer';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@state-management/auth-feature/auth.effects';

@NgModule({
	declarations: [AuthFormComponent, AuthPageComponent],
	imports: [
		CommonModule,
		MatCardModule,
		StoreModule.forFeature(AuthFeature.name, AuthFeature.reducer),
		EffectsModule.forFeature([AuthEffects]),
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	exports: [AuthPageComponent],
})
export class AuthModule {}
