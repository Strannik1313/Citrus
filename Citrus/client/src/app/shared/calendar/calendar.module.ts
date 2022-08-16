import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { AddClassDirective } from './add-class.directive';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
	declarations: [CalendarComponent, AddClassDirective],
	imports: [CommonModule, PipesModule],
	exports: [CalendarComponent],
})
export class CalendarModule {}
