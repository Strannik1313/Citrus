import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossroadPageLayoutComponent } from '../components/crossroad-page-layout/crossroad-page-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CrossroadPageLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'crossroad', component: CrossroadPageLayoutComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CrossroadPageModule { }
