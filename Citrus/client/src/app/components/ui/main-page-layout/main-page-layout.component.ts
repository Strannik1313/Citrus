import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';
import { BUTTON_LABELS } from '@enums/ButtonLabels';
import { LABELS } from '@enums/Labels';

@Component({
	selector: 'app-main-page-layout',
	templateUrl: './main-page-layout.component.html',
	styleUrls: ['./main-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutComponent {
	BUTTON_LABELS: typeof BUTTON_LABELS = BUTTON_LABELS;
	LABELS: typeof LABELS = LABELS;
	constructor(private store: Store) {}

	startProcessBtnClick() {
		this.store.dispatch(loadWizard());
	}
}
