import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossroadPageLayoutComponent } from './components/crossroad-page-layout/crossroad-page-layout.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CrossroadPageLayoutComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: '', component: CrossroadPageLayoutComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class CrossroadPageModule { }
