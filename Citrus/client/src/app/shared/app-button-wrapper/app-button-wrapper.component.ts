import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { ButtonStatusService } from '@services/button-status.service';
import { RouteService } from '@services/route.service';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-button-wrapper',
	templateUrl: './app-button-wrapper.component.html',
	styleUrls: ['./app-button-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonWrapperComponent implements OnInit {
	@Input() label: string = '';
	@Input() url: string = '';

	constructor(
		public storage: StorageService,
		public routeWithUrl: RouteService,
		public status: ButtonStatusService,
	) {}

	ngOnInit(): void {
		this.status.setButtonStatus();
	}
}
