import { HeaderComponent } from '@components/ui/header/header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MainPageLayoutComponent } from '@components/ui/main-page/main-page-layout/main-page-layout.component';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';

describe('HeaderComponent', () => {
	let fixture: ComponentFixture<HeaderComponent>;
	let component: HeaderComponent;
	let homeButton: DebugElement;
	let loginButton: DebugElement;
	let logoutButton: DebugElement;
	let registerButton: DebugElement;
	let homeIcon: DebugElement;
	let loginIcon: DebugElement;
	let registerIcon: DebugElement;
	let logoutIcon: DebugElement;
	let location: Location;
	let cdr: ChangeDetectorRef;

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
					{
						path: 'auth/login',
						component: MainPageLayoutComponent,
						pathMatch: 'full',
					},
					{
						path: 'auth/register',
						component: MainPageLayoutComponent,
						pathMatch: 'full',
					},
				]),
				CommonModule,
				MatButtonModule,
				MatIconModule,
				MatTooltipModule,
				SpinnerModule,
			],
			providers: [ChangeDetectorRef],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
		fixture.detectChanges();
		location = fixture.componentRef.injector.get(Location);
		homeButton = fixture.debugElement.query(By.css('[data-testid="home_btn"]'));
		loginButton = fixture.debugElement.query(By.css('[data-testid="login_btn"]'));
		logoutButton = fixture.debugElement.query(By.css('[data-testid="logout_btn"]'));
		registerButton = fixture.debugElement.query(By.css('[data-testid="register_btn"]'));
		homeIcon = fixture.debugElement.query(By.css('[data-testid="home_icon"]'));
	});

	afterAll(() => {
		fixture.destroy();
	});

	describe('HeaderComponent', () => {
		it('HeaderComponent exist', () => {
			expect(component).toBeTruthy();
		});

		it('onLogoutClick calls logout.emit()', () => {
			const spy = spyOn(component.logout, 'emit');
			component.onLogoutClick();
			expect(spy).toHaveBeenCalledOnceWith();
		});
	});

	describe('template', () => {
		describe('home button', () => {
			it('home button has right attributes', () => {
				const attributes = { 'mat-icon-button': '', color: 'primary' };
				expect(homeButton.attributes).toEqual(jasmine.objectContaining(attributes));
			});

			it('icon home mat-icon', () => {
				expect(homeIcon.nativeElement.textContent).toBe('home');
			});

			it('home button click navigate to "/"', async () => {
				homeButton.triggerEventHandler('click', undefined);
				await fixture.whenStable();
				expect(location.path()).toBe('/');
			});
		});

		describe('auth container', () => {
			describe('buttons for unauthorized user', () => {
				beforeEach(() => {
					component.isLogged = false;
					component.isUserInitializingProcess = false;
					cdr.detectChanges();
					loginButton = fixture.debugElement.query(By.css('[data-testid="login_btn"]'));
					logoutButton = fixture.debugElement.query(By.css('[data-testid="logout_btn"]'));
					registerButton = fixture.debugElement.query(By.css('[data-testid="register_btn"]'));
					loginIcon = fixture.debugElement.query(By.css('[data-testid="login_icon"]'));
					registerIcon = fixture.debugElement.query(By.css('[data-testid="register_icon"]'));
				});

				it('if user is not logged ang is not process of initializing render login and register buttons', () => {
					expect(loginButton).toBeTruthy();
					expect(logoutButton).not.toBeTruthy();
					expect(registerButton).toBeTruthy();
				});

				it('login button click navigate to "/auth/login"', async () => {
					loginButton.triggerEventHandler('click', undefined);
					await fixture.whenStable();
					expect(location.path()).toBe('/auth/login');
				});

				it('register button click navigate to "/auth/register"', async () => {
					registerButton.triggerEventHandler('click', undefined);
					await fixture.whenStable();
					expect(location.path()).toBe('/auth/register');
				});

				it('icon login mat-icon', () => {
					expect(loginIcon.nativeElement.textContent).toBe('login');
				});

				it('icon register mat-icon', () => {
					expect(registerIcon.nativeElement.textContent).toBe('person_add');
				});
			});

			describe('buttons for authorized user', () => {
				beforeEach(() => {
					component.isLogged = true;
					component.isUserInitializingProcess = false;
					cdr.detectChanges();
					loginButton = fixture.debugElement.query(By.css('[data-testid="login_btn"]'));
					logoutButton = fixture.debugElement.query(By.css('[data-testid="logout_btn"]'));
					registerButton = fixture.debugElement.query(By.css('[data-testid="register_btn"]'));
					logoutIcon = fixture.debugElement.query(By.css('[data-testid="logout_icon"]'));
				});

				it('if user is logged ang is not process of initializing render logout button', () => {
					expect(loginButton).not.toBeTruthy();
					expect(logoutButton).toBeTruthy();
					expect(registerButton).not.toBeTruthy();
				});

				it('logout button click call onLogoutClick()', async () => {
					let spy = spyOn(component, 'onLogoutClick');
					logoutButton.triggerEventHandler('click', undefined);
					expect(spy).toHaveBeenCalledOnceWith();
				});

				it('icon logout mat-icon', () => {
					expect(logoutIcon.nativeElement.textContent).toBe('logout');
				});
			});

			it('if user is not logged ang is process of initializing dont render buttons', () => {
				component.isLogged = false;
				component.isUserInitializingProcess = true;
				cdr.detectChanges();
				loginButton = fixture.debugElement.query(By.css('[data-testid="login_btn"]'));
				logoutButton = fixture.debugElement.query(By.css('[data-testid="logout_btn"]'));
				registerButton = fixture.debugElement.query(By.css('[data-testid="register_btn"]'));
				expect(loginButton).not.toBeTruthy();
				expect(logoutButton).not.toBeTruthy();
				expect(registerButton).not.toBeTruthy();
			});

			it('if user is logged ang is process of initializing dont render buttons', () => {
				component.isLogged = true;
				component.isUserInitializingProcess = true;
				cdr.detectChanges();
				loginButton = fixture.debugElement.query(By.css('[data-testid="login_btn"]'));
				logoutButton = fixture.debugElement.query(By.css('[data-testid="logout_btn"]'));
				registerButton = fixture.debugElement.query(By.css('[data-testid="register_btn"]'));
				expect(loginButton).not.toBeTruthy();
				expect(logoutButton).not.toBeTruthy();
				expect(registerButton).not.toBeTruthy();
			});
		});
	});
});
