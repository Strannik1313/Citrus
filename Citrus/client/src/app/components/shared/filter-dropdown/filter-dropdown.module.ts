import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from '@shared/filter-dropdown/filter-dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [FilterDropdownComponent],
	imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
	exports: [FilterDropdownComponent],
})
export class FilterDropdownModule {}
