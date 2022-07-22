import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigateService } from '@services/navigate.service';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-button-wrapper',
	templateUrl: './app-button-wrapper.component.html',
	styleUrls: ['./app-button-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonWrapperComponent {
	@Input() label: string = '';
	@Input() url: string = '';

	constructor(
		public storage: StorageService,
		public navigateService: NavigateService,
	) {}
}
