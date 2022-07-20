import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SpecChoiceLayoutComponent } from '@components/ui/spec-choice-ui/spec-choice-layout.component';
import { SpecChoiceWrapperComponent } from '@components/wrappers/spec-choice-wrapper/spec-choice-wrapper.component';
import { AppButtonGroupModule } from '@shared/app-button-group/app-button-group.module';

@NgModule({
	declarations: [SpecChoiceLayoutComponent, SpecChoiceWrapperComponent],
	imports: [
		CommonModule,
		AppButtonGroupModule,
		MatCardModule,
		MatListModule,
		RouterModule.forChild([
			{ path: '', component: SpecChoiceWrapperComponent },
		]),
	],
})
export class SpecChoicePageModule {}
