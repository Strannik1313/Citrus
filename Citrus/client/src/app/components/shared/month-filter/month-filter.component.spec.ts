import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MonthFilterComponent } from '@shared/month-filter/month-filter.component';

describe('FilterDropdownComponent', () => {
	let component: MonthFilterComponent;
	let fixture: ComponentFixture<MonthFilterComponent>;
	let matLabel: DebugElement;
	let matSelect: DebugElement;
	let matOptions: DebugElement[];
	let loader: HarnessLoader;
	let select: MatSelectHarness;
	let datePipe: DatePipe;

	let mockMatSelectChange: MatSelectChange;
	let mockFirstMonth = new Date(2000, 0, 1).toString();
	let mockSecondMonth = new Date(2000, 1, 1).toString();
	let mockMonths: string[] = [mockFirstMonth, mockSecondMonth];
	let mockLabel = 'mockLabel';
	let mockSelectedMonth: string = mockMonths[0];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MonthFilterComponent],
			imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, BrowserModule, BrowserAnimationsModule],
			providers: [
				{
					provide: MatSelectChange,
					useValue: { value: mockSelectedMonth },
				},
				DatePipe,
			],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(MonthFilterComponent);
		component = fixture.componentInstance;
		component.selectedMonth = mockSelectedMonth;
		component.months = mockMonths;
		component.label = mockLabel;
		mockMatSelectChange = fixture.componentRef.injector.get(MatSelectChange);
		datePipe = fixture.componentRef.injector.get(DatePipe);
		fixture.detectChanges();

		loader = TestbedHarnessEnvironment.loader(fixture);
		select = await loader.getHarness(MatSelectHarness);
		await select.open();

		matLabel = fixture.debugElement.query(By.css('[data-testid="month_filter_label"]'));
		matSelect = fixture.debugElement.query(By.css('[data-testid="month_filter_mat_select"]'));
		matOptions = fixture.debugElement.queryAll(By.css('[data-testid="month_filter_mat_option"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('MonthFilterComponent', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('onFilterClick', () => {
			let spy = spyOn(component.onMonthSelected, 'emit');
			component.onFilterClick(mockMatSelectChange);
			expect(spy).toHaveBeenCalledOnceWith(mockSelectedMonth);
		});
	});

	describe('template', () => {
		it('mat-label has right label', () => {
			expect(matLabel.nativeElement.textContent).toBe(mockLabel);
		});

		it('mat-select has right selection', () => {
			expect(matSelect.nativeElement.textContent).toBe(datePipe.transform(mockSelectedMonth, 'LLLL'));
		});

		it('mat-select has disableOptionCentering attribute', () => {
			expect(matSelect.attributes?.disableOptionCentering).toBe('');
		});

		it('mat-select has right panelClass attribute', () => {
			expect(matSelect.attributes?.panelClass).toBe('filter-dropdown-panel');
		});

		it('selectionChange event calls onFilterClick with event', () => {
			let spy = spyOn(component, 'onFilterClick');
			matSelect.triggerEventHandler('selectionChange', mockMatSelectChange);
			expect(spy).toHaveBeenCalledOnceWith(mockMatSelectChange);
		});

		it('mat-option has label as item.name', () => {
			expect(matOptions[0].nativeElement.textContent).toBe(datePipe.transform(mockSelectedMonth, 'LLLL'));
		});
	});
});
