import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { AutocompleteComponent } from '@shared/autocomplete/autocomplete.component';

@NgModule({
	declarations: [AutocompleteComponent],
	imports: [CommonModule, FormsModule, OverlayModule],
	exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
