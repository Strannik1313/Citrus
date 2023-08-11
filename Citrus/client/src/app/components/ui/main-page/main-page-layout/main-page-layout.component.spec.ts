import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomePageLabels } from '@enums/labels/HomePageLabels';

describe('MainPageLayoutComponent', () => {
	let fixture: ComponentFixture<MainPageLayoutComponent>;
	let component: MainPageLayoutComponent;
	let btn: DebugElement;
	let title: DebugElement;
	let subtitle: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MainPageLayoutComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainPageLayoutComponent);
		component = fixture.componentInstance;
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
			let spy = spyOn(component.onStartProcess, 'emit');
			component.startProcessBtnClick();
			expect(spy).toHaveBeenCalledOnceWith();
		});
	});

	describe('template', () => {
		it('call startProcessBtnClick after btn click', () => {
			let spy = spyOn(component, 'startProcessBtnClick');
			btn.triggerEventHandler('click', undefined);
			expect(spy).toHaveBeenCalled();
		});

		it('right button label', () => {
			expect(btn.nativeElement.textContent).toBe(HomePageLabels.MAKE_ORDER_BTN);
		});

		it('right title label', () => {
			expect(title.nativeElement.textContent).toBe(HomePageLabels.TITLE);
		});

		it('right subtitle label', () => {
			expect(subtitle.nativeElement.textContent).toBe(HomePageLabels.SUBTITLE);
		});
	});
});
