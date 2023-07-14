import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownComponent } from './filter-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterItem } from '@shared/filter-dropdown/interfaces/FilterItem';
import { DebugElement } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('FilterDropdownComponent', () => {
	let component: FilterDropdownComponent;
	let fixture: ComponentFixture<FilterDropdownComponent>;
	let matLabel: DebugElement;
	let matSelect: DebugElement;
	let matOptions: DebugElement[];
	let loader: HarnessLoader;
	let select: MatSelectHarness;

	let mockMatSelectChange: MatSelectChange;
	let mockItems: FilterItem[] = [{ name: 'mockItem1' }, { name: 'mockItem2' }];
	let mockLabel = 'mockLabel';
	let mockSelectedItem: FilterItem = mockItems[0];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FilterDropdownComponent],
			imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, BrowserModule, BrowserAnimationsModule],
			providers: [
				{
					provide: MatSelectChange,
					useValue: { value: mockSelectedItem },
				},
			],
		}).compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(FilterDropdownComponent);
		component = fixture.componentInstance;
		component.selectedItem = mockSelectedItem;
		component.items = mockItems;
		component.label = mockLabel;
		mockMatSelectChange = fixture.componentRef.injector.get(MatSelectChange);
		fixture.detectChanges();

		loader = TestbedHarnessEnvironment.loader(fixture);
		select = await loader.getHarness(MatSelectHarness);
		await select.open();

		matLabel = fixture.debugElement.query(By.css('[data-testid="filter_dropdown_label"]'));
		matSelect = fixture.debugElement.query(By.css('[data-testid="filter_dropdown_select"]'));
		matOptions = fixture.debugElement.queryAll(By.css('[data-testid="filter_dropdown_mat-option"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('FilterDropdownComponent', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('onFilterClick', () => {
			let spy = spyOn(component.onFilterChange, 'emit');
			component.onFilterClick(mockMatSelectChange);
			expect(spy).toHaveBeenCalledOnceWith(mockSelectedItem);
		});

		it('trackByFn', () => {
			expect(component.trackByFn(0, mockSelectedItem)).toBe(mockSelectedItem.name);
		});
	});

	describe('template', () => {
		it('mat-label has right label', () => {
			expect(matLabel.nativeElement.textContent).toBe(mockLabel);
		});

		it('mat-select has right selection', async () => {
			expect(matSelect.nativeElement.textContent).toBe(mockSelectedItem.name);
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
			expect(matOptions[0].nativeElement.textContent).toBe(mockSelectedItem.name);
		});
	});
});
