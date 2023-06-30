import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';

@Component({
	selector: 'app-main-page-layout',
	templateUrl: './main-page-layout.component.html',
	styleUrls: ['./main-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutComponent {
	constructor(private store: Store) {}

	startProcessBtnClick() {
		this.store.dispatch(loadWizard());
	}
}
