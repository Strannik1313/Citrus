import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockAuthForm, MockUserDto } from '@tests/mock-constants';
import { AuthService } from '@api/AuthService';

describe('AuthService', () => {
	let authService: AuthService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [AuthService],
		});
	});

	beforeEach(() => {
		authService = TestBed.inject(AuthService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it('logout', () => {
		const expectedUrl = '/api/auth/logout';
		authService.logout(MockUserDto).subscribe(response => {
			expect(response).toBeNull();
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(null);
		controller.verify();
	});

	it('login', () => {
		const expectedUrl = '/api/auth/login';
		authService.login(MockAuthForm).subscribe(response => {
			expect(response).toEqual(MockUserDto);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(MockUserDto);
		controller.verify();
	});

	it('register', () => {
		const expectedUrl = '/api/auth/register';
		authService.register(MockAuthForm).subscribe(response => {
			expect(response).toBeNull();
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(null);
		controller.verify();
	});

	it('refresh-tokens', () => {
		const expectedUrl = '/api/auth/refresh-tokens';
		authService.refreshTokens().subscribe(response => {
			expect(response).toBe('mock');
		});
		const request = controller.expectOne(expectedUrl);
		request.flush('mock');
		controller.verify();
	});

	it('currentUser', () => {
		const expectedUrl = '/api/auth/current-user';
		authService.currentUser().subscribe(response => {
			expect(response).toBe(MockUserDto);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(MockUserDto);
		controller.verify();
	});
});
