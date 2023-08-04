import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { HEADER_LABELS } from '@enums/labels/HeaderLabels';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() isLogged = false;
	readonly routes = NAVIGATE_ROUTES;
	readonly HeaderLabels = HEADER_LABELS;
}
