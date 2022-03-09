import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageLayoutComponent } from './components/main-page-layout/main-page-layout.component';
import { MainPageLayoutHeaderComponent } from './components/main-page-layout-header/main-page-layout-header.component';
import { MainPageLayoutFooterComponent } from './components/main-page-layout-footer/main-page-layout-footer.component';



@NgModule({
  declarations: [
    MainPageLayoutComponent,
    MainPageLayoutHeaderComponent,
    MainPageLayoutFooterComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
