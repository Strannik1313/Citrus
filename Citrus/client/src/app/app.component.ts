import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectShowSnakeBar } from '@state-management/main-feature/main.reducer';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	showSnakeBar$: Observable<boolean> = new Observable<boolean>();

	constructor(private store: Store) {
		this.showSnakeBar$ = this.store.select(selectShowSnakeBar);
	}

	onCloseSnakeBarClick() {
		this.store.dispatch(hideSnakeBar());
	}
}
