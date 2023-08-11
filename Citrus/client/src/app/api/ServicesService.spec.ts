import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockService } from '@tests/mock-constants';
import { ServicesService } from '@api/ServicesService';

describe('ServicesService', () => {
	let mastersService: ServicesService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ServicesService],
		});
	});

	beforeEach(() => {
		mastersService = TestBed.inject(ServicesService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it('getServices', () => {
		const expectedUrl = '/api/services';
		mastersService.getServices('mock').subscribe(response => {
			expect(response).toEqual([MockService]);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush([MockService]);
		controller.verify();
	});
});
