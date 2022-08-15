import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayjsStringPipe } from './dayjs-string.pipe';

@NgModule({
	declarations: [DayjsStringPipe],
	imports: [CommonModule],
	exports: [DayjsStringPipe],
})
export class PipesModule {}
