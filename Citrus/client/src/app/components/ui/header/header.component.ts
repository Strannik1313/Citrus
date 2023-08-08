import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { HEADER_LABELS } from '@enums/labels/HeaderLabels';
import { UserDto } from '@models/UserDto';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() isLogged = false;
	@Input() isLoadingAuthButtonsState = true;
	@Input() user: UserDto | null = null;
	@Output() logout: EventEmitter<void> = new EventEmitter<void>();
	readonly routes = NAVIGATE_ROUTES;
	readonly HeaderLabels = HEADER_LABELS;

	onLogoutClick() {
		this.logout.emit();
	}
}
