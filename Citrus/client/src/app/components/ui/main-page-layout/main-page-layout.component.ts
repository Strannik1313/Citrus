import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATE_ROUTES } from '@constants/NavigateRoutes';

@Component({
	selector: 'app-main-page-layout',
	templateUrl: './main-page-layout.component.html',
	styleUrls: ['./main-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutComponent {
	constructor(private router: Router) {}
	startProcessBtnClick() {
		this.router.navigate([NAVIGATE_ROUTES.wizard]);
	}
}
