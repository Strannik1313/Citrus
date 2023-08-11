import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPageComponent } from './auth-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFormComponent } from '@shared/auth/auth-form/auth-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthFormType } from '@enums/AuthFormType';
import { cold } from 'jasmine-marbles';
import {
	selectAuthForm,
	selectAuthFormError,
	selectIsAuthFormDisabled,
} from '@state-management/auth-feature/auth.reducer';
import { MockAuthForm } from '@tests/mock-constants';
import Spy = jasmine.Spy;
import { login, register } from '@state-management/auth-feature/auth.actions';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
	let component: AuthPageComponent;
	let fixture: ComponentFixture<AuthPageComponent>;
	let store: MockStore;
	let cdr: ChangeDetectorRef;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AuthPageComponent, AuthFormComponent],
			imports: [
				MatInputModule,
				MatButtonModule,
				CommonModule,
				MatCardModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				MatFormFieldModule,
			],
			providers: [provideMockStore({ initialState: {} }), ChangeDetectorRef],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthPageComponent);
		component = fixture.componentInstance;
		store = fixture.componentRef.injector.get(MockStore);
		cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		it('sets authForm$ observable', () => {
			selectAuthForm.setResult(AuthFormType.NONE);
			store?.refreshState();
			const expected = cold('a', { a: AuthFormType.NONE });
			expect(component.authForm$).toBeObservable(expected);
		});

		it('sets isAuthFormDisabled$ observable', () => {
			selectIsAuthFormDisabled.setResult(false);
			store?.refreshState();
			const expected = cold('a', { a: false });
			expect(component.isAuthFormDisabled$).toBeObservable(expected);
		});

		it('sets error$ observable', () => {
			selectAuthFormError.setResult('mock');
			store?.refreshState();
			const expected = cold('a', { a: 'mock' });
			expect(component.error$).toBeObservable(expected);
		});
	});

	describe('onFormSubmit', () => {
		let spy: Spy;
		beforeEach(() => {
			spy = spyOn(store, 'dispatch');
		});

		it('if authForm is login, then form dispatch login() with form values', () => {
			component.onFormSubmit(MockAuthForm, AuthFormType.LOGIN);
			expect(spy).toHaveBeenCalledOnceWith(login({ payload: MockAuthForm }));
		});

		it('if type is register, then form dispatch login() with form values', () => {
			component.onFormSubmit(MockAuthForm, AuthFormType.REGISTER);
			expect(spy).toHaveBeenCalledOnceWith(register({ payload: MockAuthForm }));
		});

		it('if type is other, then do nothing', () => {
			component.onFormSubmit(MockAuthForm, AuthFormType.NONE);
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe('template', () => {
		it('dont show auth form if authForm === none', () => {
			selectAuthForm.setResult(AuthFormType.NONE);
			store?.refreshState();
			cdr.detectChanges();
			const form: DebugElement = fixture.debugElement.query(By.css('[data-testid="auth_form"]'));
			expect(form).toBeFalsy();
		});

		it('show auth form if authForm !== none', () => {
			selectAuthForm.setResult(AuthFormType.LOGIN);
			store?.refreshState();
			cdr.detectChanges();
			const form: DebugElement = fixture.debugElement.query(By.css('[data-testid="auth_form"]'));
			expect(form).toBeTruthy();
		});
	});

	it('onFormSubmit from auth form component calls onFormSubmit() with form values and form type', () => {
		const spy = spyOn(component, 'onFormSubmit');
		selectAuthForm.setResult(AuthFormType.LOGIN);
		store?.refreshState();
		cdr.detectChanges();
		const form: DebugElement = fixture.debugElement.query(By.css('[data-testid="auth_form"]'));
		form.triggerEventHandler('onFormSubmit', MockAuthForm);
		expect(spy).toHaveBeenCalledOnceWith(MockAuthForm, AuthFormType.LOGIN);
	});
});
