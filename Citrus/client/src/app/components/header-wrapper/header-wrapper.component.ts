import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAVIGATE_ROUTES } from '@constants/NavigateRoutes';

@Component({
	selector: 'app-header-wrapper',
	templateUrl: './header-wrapper.component.html',
	styleUrls: ['./header-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderWrapperComponent {
	public homeLink: string = NAVIGATE_ROUTES.home;
}
