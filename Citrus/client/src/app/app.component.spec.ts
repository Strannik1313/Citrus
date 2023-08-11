import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { SnakeBarModule } from '@shared/sneakbar/snake-bar.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainPageModule } from '@components/ui/main-page/main-page.module';
import { AuthModule } from '@shared/auth/auth.module';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { logout } from '@state-management/auth-feature/auth.actions';
import { selectShowSnakeBar } from '@state-management/main-feature/main.reducer';
import { cold } from 'jasmine-marbles';
import { selectIsLoadingAuthButtons, selectIsLogged, selectUser } from '@state-management/auth-feature/auth.reducer';
import { MockUserDto } from '@tests/mock-constants';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	let store: MockStore;
	let snakeBar: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent, MainPageLayoutComponent, HeaderComponent],
			imports: [
				CommonModule,
				MatIconModule,
				HttpClientModule,
				BrowserAnimationsModule,
				MatButtonModule,
				SpinnerModule,
				SnakeBarModule,
				MatTooltipModule,
				MainPageModule,
				AuthModule,
				RouterTestingModule,
				StoreRouterConnectingModule.forRoot(),
				StoreModule.forRoot({}),
				EffectsModule.forRoot([]),
			],
			providers: [provideMockStore({ initialState: {} })],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		store = fixture.componentRef.injector.get(MockStore);
		fixture.detectChanges();
		snakeBar = fixture.debugElement.query(By.css('[data-testid="shake_bar"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('AppComponent', () => {
		it('component exist', () => {
			expect(component).toBeTruthy();
		});

		it('onCloseSnakeBarClick calls hideSnakeBar()', () => {
			const spy = spyOn(store, 'dispatch');
			component.onCloseSnakeBarClick();
			expect(spy).toHaveBeenCalledOnceWith(hideSnakeBar());
		});

		it('closeBtnClick event from snake bar calls onCloseSnakeBarClick', () => {
			const spy = spyOn(component, 'onCloseSnakeBarClick');
			snakeBar.triggerEventHandler('closeBtnClick', undefined);
			expect(spy).toHaveBeenCalled();
		});

		it('onLogout dispatch logout()', () => {
			const spy = spyOn(store, 'dispatch');
			component.onLogout();
			expect(spy).toHaveBeenCalledOnceWith(logout());
		});

		describe('ngOnInit', () => {
			it('showSnakeBar$', () => {
				selectShowSnakeBar.setResult(false);
				store?.refreshState();
				const expected = cold('a', { a: false });
				expect(component.showSnakeBar$).toBeObservable(expected);
			});

			it('isUserLogged$', () => {
				selectIsLogged.setResult(false);
				store?.refreshState();
				const expected = cold('a', { a: false });
				expect(component.isUserLogged$).toBeObservable(expected);
			});

			it('isLoadingAuthButtonsState$', () => {
				selectIsLoadingAuthButtons.setResult(true);
				store?.refreshState();
				const expected = cold('a', { a: true });
				expect(component.isLoadingAuthButtonsState$).toBeObservable(expected);
			});

			it('isLoadingAuthButtonsState$', () => {
				selectUser.setResult(MockUserDto);
				store?.refreshState();
				const expected = cold('a', { a: MockUserDto });
				expect(component.user$).toBeObservable(expected);
			});
		});
	});
});
