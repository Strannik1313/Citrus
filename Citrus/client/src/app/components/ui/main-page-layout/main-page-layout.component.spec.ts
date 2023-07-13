import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageLayoutComponent } from '@components/ui/main-page-layout/main-page-layout.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BUTTON_LABELS } from '@enums/ButtonLabels';
import { LABELS } from '@enums/Labels';

describe('MainPageLayoutComponent', () => {
	let fixture: ComponentFixture<MainPageLayoutComponent>;
	let component: MainPageLayoutComponent;
	let store: MockStore;
	let btn: DebugElement;
	let title: DebugElement;
	let subtitle: DebugElement;
	const initialState = {};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MainPageLayoutComponent],
			providers: [provideMockStore(initialState)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainPageLayoutComponent);
		component = fixture.componentInstance;
		store = TestBed.inject(MockStore);
		fixture.detectChanges();
		btn = fixture.debugElement.query(By.css('[data-testid="start-process-btn"]'));
		title = fixture.debugElement.query(By.css('[data-testid="title"]'));
		subtitle = fixture.debugElement.query(By.css('[data-testid="subtitle"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('startProcessBtnClick', () => {
		it('dispatch loadWizard', () => {
			let spy = spyOn(store, 'dispatch');
			component.startProcessBtnClick();
			expect(spy).toHaveBeenCalledOnceWith(loadWizard());
		});
	});

	describe('template', () => {
		it('call startProcessBtnClick after btn click', () => {
			let spy = spyOn(component, 'startProcessBtnClick');
			btn.triggerEventHandler('click', undefined);
			expect(spy).toHaveBeenCalled();
		});

		it('right button label', () => {
			expect(btn.nativeElement.textContent).toBe(BUTTON_LABELS.MAKE_ORDER);
		});

		it('right title label', () => {
			expect(title.nativeElement.textContent).toBe(LABELS.MAIN_PAGE_TITLE);
		});

		it('right subtitle label', () => {
			expect(subtitle.nativeElement.textContent).toBe(LABELS.MAIN_PAGE_SUBTITLE);
		});
	});
});
