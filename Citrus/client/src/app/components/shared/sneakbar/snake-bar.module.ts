import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeBarComponent } from './snake-bar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [SnakeBarComponent],
	imports: [CommonModule, MatIconModule],
	exports: [SnakeBarComponent],
})
export class SnakeBarModule {}
