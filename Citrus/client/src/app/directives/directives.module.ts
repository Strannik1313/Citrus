import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoscrollDirective } from '@directives/autoscroll.directive';

@NgModule({
	declarations: [AutoscrollDirective],
	imports: [CommonModule],
	exports: [AutoscrollDirective],
})
export class DirectivesModule {}
