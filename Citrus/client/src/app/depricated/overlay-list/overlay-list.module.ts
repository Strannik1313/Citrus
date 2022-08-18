import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayListComponent } from './overlay-list.component';
import { OverlayListDirective } from './overlay-list.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
	declarations: [OverlayListComponent, OverlayListDirective],
	imports: [CommonModule, OverlayModule, DragDropModule],
	exports: [OverlayListDirective],
})
export class OverlayListModule {}
