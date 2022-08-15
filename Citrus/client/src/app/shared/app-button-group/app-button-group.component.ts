import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonPositionEnum } from '@models/header-button-conf';

export interface ButtonConf {
	label: string;
	url: string;
	buttonPosition?: ButtonPositionEnum;
}

@Component({
	selector: 'app-button-group',
	templateUrl: './app-button-group.component.html',
	styleUrls: ['./app-button-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
	@Input() buttonConf: Array<ButtonConf> = [];
	trackByFn(index: number, item: ButtonConf): string {
		return item.url;
	}
}
