import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownComponent } from './filter-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterDropdownComponent', () => {
	let component: FilterDropdownComponent;
	let fixture: ComponentFixture<FilterDropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FilterDropdownComponent],
			imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, BrowserModule, BrowserAnimationsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FilterDropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
