import { CalendarService } from '@api/CalendarService';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockCalendarDtos, MockDate, MockScheduleDto } from '@tests/mock-constants';

describe('CalendarService', () => {
	let calendarService: CalendarService;
	let controller: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [CalendarService],
		});
	});

	beforeEach(() => {
		calendarService = TestBed.inject(CalendarService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it('getDates', () => {
		const expectedUrl = '/api/calendar';
		calendarService.getDates({ serviceId: null, masterId: null, week: MockDate }).subscribe(response => {
			expect(MockCalendarDtos).toEqual(response);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush(MockCalendarDtos);
		controller.verify();
	});

	it('getSchedule', () => {
		const expectedUrl = '/api/calendar/schedule';
		calendarService.getSchedule({ date: MockDate, masterId: null }).subscribe(response => {
			expect([MockScheduleDto]).toEqual(response);
		});
		const request = controller.expectOne(expectedUrl);
		request.flush([MockScheduleDto]);
		controller.verify();
	});

	it('getMonths', () => {
		const expectedUrl = '/api/calendar/months';
		calendarService.getMonths({ currentMonth: MockDate }).subscribe(response => {
			expect({ months: [MockDate] }).toEqual(response);
		});
		const request = controller.expectOne(
			request => request.url === expectedUrl && request.params.get('currentMonth') === MockDate,
		);
		request.flush({ months: [MockDate] });
		controller.verify();
	});
});
