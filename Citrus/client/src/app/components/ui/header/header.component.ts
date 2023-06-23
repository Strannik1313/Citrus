import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public homeLink: string = NAVIGATE_ROUTES.HOME;
}
