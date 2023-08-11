import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockOrderDto } from '@tests/mock-constants';
import { OrderService } from '@api/OrderService';

describe('OrderService', () => {
	let mastersService: OrderService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [OrderService],
		});
	});

	beforeEach(() => {
		mastersService = TestBed.inject(OrderService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it('createOrder', () => {
		const expectedUrl = '/api/order';
		mastersService.createOrder(MockOrderDto).subscribe(response => {
			expect(response).toEqual(MockOrderDto);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(MockOrderDto);
		controller.verify();
	});
});
