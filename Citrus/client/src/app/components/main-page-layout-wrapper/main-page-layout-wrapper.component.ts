import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-main-page-layout-wrapper',
	templateUrl: './main-page-layout-wrapper.component.html',
	styleUrls: ['./main-page-layout-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutWrapperComponent {}
