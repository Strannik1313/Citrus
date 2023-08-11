import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MockAuthForm } from '@tests/mock-constants';

describe('AuthFormComponent', () => {
	let component: AuthFormComponent;
	let fixture: ComponentFixture<AuthFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthFormComponent],
			imports: [
				MatInputModule,
				MatButtonModule,
				CommonModule,
				MatCardModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('AuthFormComponent', () => {
		it('onSubmit', () => {
			const spy = spyOn(component.onFormSubmit, 'emit');
			component.authForm.setValue(MockAuthForm);
			component.onSubmit();
			expect(spy).toHaveBeenCalledOnceWith(MockAuthForm);
		});
	});
});
