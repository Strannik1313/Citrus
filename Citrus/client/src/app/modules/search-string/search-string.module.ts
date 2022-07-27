import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStringComponent } from '@shared/search-string/search-string.component';

@NgModule({
	declarations: [SearchStringComponent],
	imports: [CommonModule],
	exports: [SearchStringComponent],
})
export class SearchStringModule {}
