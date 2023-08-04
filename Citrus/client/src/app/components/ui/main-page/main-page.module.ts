import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageContainerComponent } from './main-page-container/main-page-container.component';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [MainPageContainerComponent, MainPageLayoutComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [MainPageContainerComponent],
})
export class MainPageModule {}
