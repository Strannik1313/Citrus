import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MastersService } from '@api/MastersService';
import { MockPageableMasterDto } from '@tests/mock-constants';

describe('MastersService', () => {
	let mastersService: MastersService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [MastersService],
		});
	});

	beforeEach(() => {
		mastersService = TestBed.inject(MastersService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	describe('getMasters', () => {
		it('getMasters without params', () => {
			const expectedUrl = '/api/masters';
			mastersService.getMasters().subscribe(response => {
				expect(response).toEqual(MockPageableMasterDto);
			});
			const request = controller.expectOne(expectedUrl);
			request.flush(MockPageableMasterDto);
			controller.verify();
		});

		it('getMasters with params', () => {
			const expectedUrl = '/api/masters?page=1';
			mastersService.getMasters({ page: 1 }).subscribe(response => {
				expect(response).toEqual(MockPageableMasterDto);
			});
			const request = controller.expectOne(expectedUrl);
			request.flush(MockPageableMasterDto);
			controller.verify();
		});
	});
});
