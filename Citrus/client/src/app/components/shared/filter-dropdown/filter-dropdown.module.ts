import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from '@shared/filter-dropdown/filter-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [FilterDropdownComponent],
	imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, BrowserModule, BrowserAnimationsModule],
	exports: [FilterDropdownComponent],
})
export class FilterDropdownModule {}
