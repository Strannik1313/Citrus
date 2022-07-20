import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossroadPageLayoutComponent } from '../../components/ui/crossroad-page-ui/crossroad-page-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonGroupModule } from 'src/app/shared/app-button-group/app-button-group.module';

@NgModule({
	declarations: [CrossroadPageLayoutComponent],
	imports: [
		CommonModule,
		AppButtonGroupModule,
		RouterModule.forChild([
			{ path: '', component: CrossroadPageLayoutComponent },
		]),
	],
	exports: [RouterModule],
})
export class CrossroadPageModule {}
