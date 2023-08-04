import { HeaderComponent } from '@components/ui/header/header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
	let fixture: ComponentFixture<HeaderComponent>;
	let component: HeaderComponent;
	let btn: DebugElement;
	let icon: DebugElement;
	let location: Location;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [
				RouterTestingModule.withRoutes([
					{
						path: '',
						component: MainPageLayoutComponent,
						pathMatch: 'full',
					},
				]),
				CommonModule,
				MatButtonModule,
				MatIconModule,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		location = fixture.componentRef.injector.get(Location);
		btn = fixture.debugElement.query(By.css('[data-testid="header_btn"]'));
		icon = fixture.debugElement.query(By.css('[data-testid="header_icon"]'));
	});

	afterAll(() => {
		fixture.destroy();
	});

	describe('HeaderComponent', () => {
		it('HeaderComponent exist', () => {
			expect(component).toBeTruthy();
		});

		it('icon home mat-icon', () => {
			expect(icon.nativeElement.textContent).toBe('home');
		});

		it('button click navigate to "/"', async () => {
			btn.triggerEventHandler('click', undefined);
			await fixture.whenStable();
			expect(location.path()).toBe('/');
		});
	});
});
