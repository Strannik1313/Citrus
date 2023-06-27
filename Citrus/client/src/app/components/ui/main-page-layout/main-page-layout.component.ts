import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadWizard } from '@state-management/wizard-feature/wizard.actions';
import { Observable } from 'rxjs';
import { selectShowSnakeBar } from '@state-management/main-feature/main.reducer';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';

@Component({
	selector: 'app-main-page-layout',
	templateUrl: './main-page-layout.component.html',
	styleUrls: ['./main-page-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageLayoutComponent {
	showSnakeBar$: Observable<boolean> = new Observable<boolean>();

	constructor(private store: Store) {
		this.showSnakeBar$ = this.store.select(selectShowSnakeBar);
	}

	startProcessBtnClick() {
		this.store.dispatch(loadWizard());
	}

	onCloseSnakeBarClick() {
		this.store.dispatch(hideSnakeBar());
	}
}
