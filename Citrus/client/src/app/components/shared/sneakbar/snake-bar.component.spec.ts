import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeBarComponent } from './snake-bar.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('SneakbarComponent', () => {
	let component: SnakeBarComponent;
	let fixture: ComponentFixture<SnakeBarComponent>;
	let mockMessage = 'test';
	let div: HTMLElement;
	let closeBtn: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SnakeBarComponent],
			imports: [CommonModule, MatIconModule, BrowserModule, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SnakeBarComponent);
		component = fixture.componentInstance;
		component.show = true;
		component.message = mockMessage;
		fixture.detectChanges();
		div = fixture.debugElement.query(By.css('.warning_message')).nativeElement;
		closeBtn = fixture.debugElement.query(By.css('.close_btn'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('SnakeBarComponent', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should show', () => {
			expect(div).toBeTruthy();
		});

		it('should render message', async () => {
			expect(div.textContent).toBe(mockMessage);
		});
	});

	describe('onCloseBtnClick', () => {
		it('should call onCloseBtnClick', () => {
			let spy = spyOn(component, 'onCloseBtnClick');
			closeBtn.triggerEventHandler('click', {});
			expect(spy).toHaveBeenCalled();
		});

		it('should call @Output closeBtnClick', () => {
			let spy = spyOn(component.closeBtnClick, 'emit');
			component.onCloseBtnClick();
			expect(spy).toHaveBeenCalled();
		});
	});
});
