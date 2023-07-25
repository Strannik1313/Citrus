import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MainPageLayoutComponent } from '@components/ui/main-page-layout/main-page-layout.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { SnakeBarModule } from '@shared/sneakbar/snake-bar.module';
import { AppRoutingModule } from './app-routing.module';

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
				AppRoutingModule,
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
			let spy = spyOn(store, 'dispatch');
			component.onCloseSnakeBarClick();
			expect(spy).toHaveBeenCalledOnceWith(hideSnakeBar());
		});

		it('closeBtnClick event from snake bar calls onCloseSnakeBarClick', () => {
			let spy = spyOn(component, 'onCloseSnakeBarClick');
			snakeBar.triggerEventHandler('closeBtnClick', undefined);
			expect(spy).toHaveBeenCalled();
		});
	});
});
