import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddActiveClassDirective } from '@directives/add-active-class.directive';
import { AutoscrollDirective } from '@directives/autoscroll.directive';

@NgModule({
	declarations: [AddActiveClassDirective, AutoscrollDirective],
	imports: [CommonModule],
	exports: [AddActiveClassDirective, AutoscrollDirective],
})
export class DirectivesModule {}
