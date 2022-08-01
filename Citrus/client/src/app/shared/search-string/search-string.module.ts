import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStringComponent } from '@shared/search-string/search-string.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [SearchStringComponent],
	imports: [CommonModule, FormsModule, OverlayModule],
	exports: [SearchStringComponent],
})
export class SearchStringModule {}
