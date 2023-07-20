import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hideSnakeBar } from '@state-management/main-feature/main.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	let store: MockStore;
	let snakeBar: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [CommonModule],
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
