import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';

@Component({
	selector: 'app-main-page-container',
	templateUrl: './main-page-container.component.html',
	styleUrls: ['./main-page-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageContainerComponent {
	constructor(private store: Store) {}

	onStartProcess() {
		this.store.dispatch(loadWizard());
	}
}
