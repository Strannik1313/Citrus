import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectShowSnakeBar } from '@state-management/main-feature/main.reducer';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';
import { selectIsLoadingAuthButtons, selectIsLogged } from '@state-management/auth-feature/auth.reducer';
import { logout } from '@state-management/auth-feature/auth.actions';
import { AuthButtonsLoadingState } from '@interfaces/ComponentsLoadingState';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	showSnakeBar$: Observable<boolean> = new Observable<boolean>();
	isUserLogged$: Observable<boolean> = new Observable<boolean>();
	isLoadingAuthButtonsState$: Observable<AuthButtonsLoadingState> = new Observable<AuthButtonsLoadingState>();

	constructor(private store: Store) {}

	onCloseSnakeBarClick() {
		this.store.dispatch(hideSnakeBar());
	}

	onLogout() {
		this.store.dispatch(logout());
	}

	ngOnInit(): void {
		this.showSnakeBar$ = this.store.select(selectShowSnakeBar);
		this.isUserLogged$ = this.store.select(selectIsLogged);
		this.isLoadingAuthButtonsState$ = this.store.select(selectIsLoadingAuthButtons);
	}
}
