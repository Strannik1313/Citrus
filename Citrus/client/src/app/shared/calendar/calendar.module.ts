import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCellComponent } from '@shared/calendar/calendar-cell/calendar-cell.component';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { AddClassDirective } from './add-class.directive';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
	declarations: [CalendarCellComponent, CalendarComponent, AddClassDirective],
	imports: [CommonModule, PipesModule],
	exports: [CalendarComponent],
})
export class CalendarModule {}
