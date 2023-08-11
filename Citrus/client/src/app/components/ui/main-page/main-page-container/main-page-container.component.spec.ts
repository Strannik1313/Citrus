import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageContainerComponent } from './main-page-container.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MainPageContainerComponent', () => {
	let component: MainPageContainerComponent;
	let fixture: ComponentFixture<MainPageContainerComponent>;
	let store: MockStore;
	let layout: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MainPageContainerComponent, MainPageLayoutComponent],
			providers: [provideMockStore({ initialState: {} })],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainPageContainerComponent);
		component = fixture.componentInstance;
		store = fixture.componentRef.injector.get(MockStore);
		fixture.detectChanges();
		layout = fixture.debugElement.query(By.css('[data-testid="main-page-layout"]'));
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onStartProcess', () => {
		it('onStartProcess dispatch loadWizard()', () => {
			let spy = spyOn(store, 'dispatch');
			component.onStartProcess();
			expect(spy).toHaveBeenCalledOnceWith(loadWizard());
		});
	});

	describe('template', () => {
		it('onStartProcess event calls onStartProcess()', () => {
			const spy = spyOn(component, 'onStartProcess');
			layout.triggerEventHandler('onStartProcess', undefined);
			expect(spy).toHaveBeenCalledOnceWith();
		});
	});
});
