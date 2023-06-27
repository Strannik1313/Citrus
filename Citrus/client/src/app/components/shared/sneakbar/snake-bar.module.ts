import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeBarComponent } from './snake-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [SnakeBarComponent],
	imports: [CommonModule, MatIconModule, BrowserModule, BrowserAnimationsModule],
	exports: [SnakeBarComponent],
})
export class SnakeBarModule {}
