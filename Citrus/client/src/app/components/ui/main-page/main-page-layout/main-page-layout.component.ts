import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { HomePageLabels } from '@enums/labels/HomePageLabels';

@Component({
	selector: 'app-main-page-layout',
	templateUrl: './main-page-layout.component.html',
	styleUrls: ['./main-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutComponent {
	@Output() onStartProcess: EventEmitter<void> = new EventEmitter<void>();
	readonly HomePageLabels = HomePageLabels;

	startProcessBtnClick() {
		this.onStartProcess.emit();
	}
}
