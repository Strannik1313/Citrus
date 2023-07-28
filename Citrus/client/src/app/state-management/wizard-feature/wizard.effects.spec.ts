import { TestBed } from '@angular/core/testing';
import { WizardEffects } from '@state-management/wizard-feature/wizard.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ServicesService } from '@api/ServicesService';
import {
	MockCalendarDtos,
	MockConfirmForm,
	MockDate,
	MockMasterDto,
	MockPageableMasterDto,
	MockSchedule,
	MockSelectors,
	MockService,
} from '@tests/mockData/mockConstants';
import {
	changeWizardStep,
	checkIsWizardAvailable,
	decrementWizardStep,
	getDates,
	getMasters,
	getMonths,
	getNextWeek,
	getPrevWeek,
	getSchedules,
	getServices,
	incrementWizardStep,
	initializeWizardConfirmStep,
	initializeWizardDateChoice,
	initializeWizardServiceChoice,
	loadWizard,
	resetSchedules,
	resetSelectedDay,
	resetSelectedMaster,
	resetSelectedMonth,
	resetSelectedSchedule,
	resetSelectedService,
	resetWizard,
	resetWizardDateChoiceStepState,
	resetWizardStep,
	setAcceptPageAccess,
	setCalendarComponentLoading,
	setDates,
	setFwdBtnDisabled,
	setFwdBtnVisible,
	setMasters,
	setMastersFilterComponentLoading,
	setMonths,
	setMonthsFilterComponentLoading,
	setOrder,
	setPrevWeekBtnDisabled,
	setSelectedDay,
	setSelectedMaster,
	setSelectedMonth,
	setSelectedSchedule,
	setSelectedService,
	setServices,
	setServicesListLoading,
} from '@state-management/wizard-feature/wizard.actions';
import { MastersService } from '@api/MastersService';
import { CalendarService } from '@api/CalendarService';
import { OrderService } from '@api/OrderService';
import {
	selectSelectedMaster,
	selectSelectedSchedule,
	selectSelectedService,
	selectStep,
} from '@state-management/wizard-feature/wizard.reducer';
import { WizardMaxStep } from '@components/ui/wizard/constants/WizardMaxStep';
import { WizardStepperEnum } from '@components/ui/wizard/wizard.component';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Router } from '@angular/router';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { MasterLoaderDto } from '@models/MasterLoaderDto';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { DatesHelper } from '@helpers/DatesHelper';
import { OrderDto } from '@models/OrderDto';

describe('WizardEffects', () => {
	let actions$: Observable<Action>;
	let effects: WizardEffects;
	let store: MockStore;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				WizardEffects,
				provideMockStore({
					selectors: MockSelectors,
				}),
				provideMockActions(() => actions$),
				{
					provide: ServicesService,
					useValue: {
						getServices(filter: string | null) {
							return of([MockService]);
						},
					},
				},
				{
					provide: MastersService,
					useValue: {
						getMasters(params: MasterLoaderDto) {
							return of(MockPageableMasterDto);
						},
					},
				},
				{
					provide: CalendarService,
					useValue: {
						getDates(params: CalenderDatesLoaderDto) {
							return of(MockCalendarDtos);
						},
						getMonths(params: MonthsLoaderDto) {
							return of({ months: [MockDate] });
						},
					},
				},
				{
					provide: OrderService,
					useValue: {
						createOrder(params: OrderDto) {
							return of('');
						},
					},
				},
				{
					provide: Router,
					useValue: {
						navigate() {
							return undefined;
						},
					},
				},
			],
		}).compileComponents();
		actions$ = new Observable<Action>();
		effects = TestBed.inject(WizardEffects);
		router = TestBed.inject(Router);
	});

	describe('getServices$', () => {
		const marbleValues = {
			b: setServices({ payload: [MockService] }),
			c: setServicesListLoading({ payload: false }),
		};
		it('calls setServices({ payload: [MockService] }) and setServicesListLoading({ payload: false }) after 300ms', () => {
			getTestScheduler().run(helpers => {
				actions$ = hot('a', { a: getServices({ payload: 'mock' }) });
				helpers.expectObservable(effects.getServices$).toBe('300ms (bc)', marbleValues);
			});
		});

		it('calls setServices({ payload: [MockService] }) and setServicesListLoading({ payload: false }) immediately', () => {
			getTestScheduler().run(helpers => {
				actions$ = hot('a', { a: getServices({ payload: null }) });
				helpers.expectObservable(effects.getServices$).toBe('(bc)', marbleValues);
			});
		});
	});

	describe('increaseWizardStep$', () => {
		beforeEach(() => {
			actions$ = of(incrementWizardStep());
		});

		it('calls resetWizardStep because it is max wizard step', () => {
			selectStep.setResult(WizardMaxStep);
			store?.refreshState();
			effects.increaseWizardStep$.subscribe(action => {
				expect(action).toEqual(resetWizardStep());
			});
		});

		it('calls changeWizardStep by 1 because it is not max wizard step', () => {
			effects.increaseWizardStep$.subscribe(action => {
				expect(action).toEqual(changeWizardStep({ payload: 1 }));
			});
		});
	});

	describe('decreaseWizardStep$', () => {
		beforeEach(() => {
			actions$ = of(decrementWizardStep());
		});

		it('calls resetWizardStep because it is wizard service choice step', () => {
			selectStep.setResult(WizardStepperEnum.SERVICE_CHOICE);
			store?.refreshState();
			effects.decreaseWizardStep$.subscribe(action => {
				expect(action).toEqual(resetWizardStep());
			});
		});

		it('calls changeWizardStep by -1 because it is not max wizard step', () => {
			selectStep.setResult(WizardStepperEnum.DATE_CHOICE);
			store?.refreshState();
			effects.decreaseWizardStep$.subscribe(action => {
				expect(action).toEqual(changeWizardStep({ payload: -1 }));
			});
		});
	});

	describe('changeWizardStep$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: changeWizardStep({ payload: 1 }) });
		});

		it('calls initializeWizardServiceChoice() and resetWizardDateChoiceStepState() on the first step', () => {
			const expected = cold('(bc)', {
				b: initializeWizardServiceChoice(),
				c: resetWizardDateChoiceStepState(),
			});
			const spy = spyOn(router, 'navigate');
			expect(effects.changeWizardStep$).toBeObservable(expected);
			expect(spy).toHaveBeenCalledOnceWith([NAVIGATE_ROUTES.WIZARD]);
		});

		it('calls initializeWizardDateChoice() on the second step', () => {
			selectStep.setResult(WizardStepperEnum.DATE_CHOICE);
			store?.refreshState();
			const expected = cold('b', {
				b: initializeWizardDateChoice(),
			});
			expect(effects.changeWizardStep$).toBeObservable(expected);
		});

		it('calls initializeWizardConfirmStep() on the third step', () => {
			selectStep.setResult(WizardStepperEnum.CONFIRM_PAGE);
			store?.refreshState();
			const expected = cold('b', {
				b: initializeWizardConfirmStep(),
			});
			expect(effects.changeWizardStep$).toBeObservable(expected);
		});

		it('calls resetWizardStep() on default case', () => {
			selectStep.setResult(100);
			store?.refreshState();
			const expected = cold('b', {
				b: resetWizardStep(),
			});
			expect(effects.changeWizardStep$).toBeObservable(expected);
		});
	});

	it('checkIsWizardAvailable$', () => {
		actions$ = of(changeWizardStep({ payload: 1 }));
		effects.checkIsWizardAvailable$.subscribe(action => {
			expect(action).toEqual(checkIsWizardAvailable());
		});
	});

	it('resetWizardStep$', () => {
		const spy = spyOn(router, 'navigate');
		actions$ = hot('a', { a: resetWizardStep() });
		const expected = cold('(bc)', {
			b: resetSelectedService(),
			c: setFwdBtnDisabled({ payload: true }),
		});
		expect(effects.resetWizardStep$).toBeObservable(expected);
		expect(spy).toHaveBeenCalledOnceWith([NAVIGATE_ROUTES.HOME]);
	});

	describe('setSelectedService$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: setSelectedService({ payload: MockService }) });
		});

		it('calls setFwdBtnDisabled({payload: true}) if in store is not selected service', () => {
			selectSelectedService.setResult(null);
			const expected = cold('b', { b: setFwdBtnDisabled({ payload: true }) });
			expect(effects.setSelectedService$).toBeObservable(expected);
		});

		it('calls setFwdBtnDisabled({payload: false}) if in store is selected service', () => {
			const expected = cold('b', { b: setFwdBtnDisabled({ payload: false }) });
			expect(effects.setSelectedService$).toBeObservable(expected);
		});
	});

	it('getMasters$', () => {
		actions$ = hot('a', { a: getMasters({ payload: { serviceId: null } }) });
		const expected = cold('(bc)', {
			b: setMasters({ payload: [MockMasterDto] }),
			c: setMastersFilterComponentLoading({ payload: false }),
		});
		expect(effects.getMasters$).toBeObservable(expected);
	});

	it('getDates$', () => {
		actions$ = hot('a', { a: getDates({ payload: { serviceId: '1', masterId: '1' } }) });
		const expected = cold('(bc)', {
			b: setDates({ payload: MockCalendarDtos }),
			c: setCalendarComponentLoading({ payload: false }),
		});
		expect(effects.getDates$).toBeObservable(expected);
	});

	it('getScheduleAfterSelectDay$', () => {
		actions$ = hot('a', { a: setSelectedDay({ payload: 'mock' }) });
		const expected = cold('b', {
			b: getSchedules({ payload: { date: 'mock', masterId: MockMasterDto.id } }),
		});
		expect(effects.getScheduleAfterSelectDay$).toBeObservable(expected);
	});

	it('getMonths$', () => {
		actions$ = hot('a', { a: getMonths({ payload: { currentMonth: MockDate } }) });
		const expected = cold('(bc)', {
			b: setMonths({ payload: { months: [MockDate] } }),
			c: setMonthsFilterComponentLoading({ payload: false }),
		});
		expect(effects.getMonths$).toBeObservable(expected);
	});

	describe('getNextWeek$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: getNextWeek() });
		});

		it('get next week if in store are selectedService and calendarDates', () => {
			const expected = cold('b', {
				b: setDates({ payload: MockCalendarDtos }),
			});
			expect(effects.getNextWeek$).toBeObservable(expected);
		});

		it('get next week fi in store are not on of selectedService and calendarDates', () => {
			selectSelectedService.setResult(null);
			const expected = cold('(bc)', {
				b: setDates({ payload: MockCalendarDtos }),
				c: setCalendarComponentLoading({ payload: false }),
			});
			expect(effects.getNextWeek$).toBeObservable(expected);
		});
	});

	describe('getPrevWeek$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: getPrevWeek() });
		});

		it('get prev week if in store are selectedService and calendarDates', () => {
			const expected = cold('b', {
				b: setDates({ payload: MockCalendarDtos }),
			});
			expect(effects.getPrevWeek$).toBeObservable(expected);
		});

		it('get prev week if in store are not on of selectedService and calendarDates', () => {
			selectSelectedService.setResult(null);
			const expected = cold('(bc)', {
				b: setDates({ payload: MockCalendarDtos }),
				c: setCalendarComponentLoading({ payload: false }),
			});
			expect(effects.getPrevWeek$).toBeObservable(expected);
		});
	});

	it('setMonths$', () => {
		actions$ = hot('a', { a: setDates({ payload: MockCalendarDtos }) });
		const expected = cold('(bc)', {
			b: setSelectedMonth({ payload: DatesHelper.getStartOfMonth(MockCalendarDtos[0].date) }),
			c: setPrevWeekBtnDisabled({ payload: true }),
		});
		expect(effects.setMonths$).toBeObservable(expected);
	});

	it('setSelectedSchedule$', () => {
		actions$ = hot('a', { a: setSelectedSchedule({ payload: MockSchedule }) });
		const expected = cold('(bc)', {
			b: setFwdBtnDisabled({ payload: false }),
			c: setSelectedMaster({ payload: MockMasterDto }),
		});
		expect(effects.setSelectedSchedule$).toBeObservable(expected);
	});

	it('resetSecondStepAfterSetMaster$', () => {
		actions$ = hot('a', { a: setSelectedMaster({ payload: MockMasterDto }) });
		const expected = cold('b', {
			b: getSchedules({ payload: { date: MockDate, masterId: MockMasterDto.id } }),
		});
		expect(effects.resetSecondStepAfterSetMaster$).toBeObservable(expected);
	});

	it('resetWizardDateChoiceStepState$', () => {
		actions$ = hot('a', { a: resetWizardDateChoiceStepState() });
		const expected = cold('(bcdef)', {
			b: resetSelectedMaster(),
			c: resetSelectedDay(),
			d: resetSelectedMonth(),
			e: resetSelectedSchedule(),
			f: resetSchedules(),
		});
		expect(effects.resetWizardDateChoiceStepState$).toBeObservable(expected);
	});

	it('loadWizard$', () => {
		actions$ = hot('a', { a: loadWizard() });
		const expected = cold('b', { b: incrementWizardStep() });
		expect(effects.loadWizard$).toBeObservable(expected);
	});

	it('createOrder$', () => {
		actions$ = hot('a', { a: setOrder({ payload: MockConfirmForm }) });
		const expected = cold('(bc)', {
			b: resetWizard(),
			c: setAcceptPageAccess({ payload: true }),
		});
		const spy = spyOn(router, 'navigate');
		expect(effects.createOrder$).toBeObservable(expected);
		expect(spy).toHaveBeenCalledOnceWith([NAVIGATE_ROUTES.ACCEPT]);
	});

	describe('initializeWizardServiceChoice$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: initializeWizardServiceChoice() });
		});

		it('calls getServices(), setFwdBtnDisabled() and setServicesListLoading() when in store are selectedService', () => {
			const expected = cold('(bcd)', {
				b: getServices({ payload: null }),
				c: setFwdBtnDisabled({ payload: false }),
				d: setServicesListLoading({ payload: true }),
			});
			expect(effects.initializeWizardServiceChoice$).toBeObservable(expected);
		});

		it('calls getServices() and setServicesListLoading() when in store are not selectedService', () => {
			selectSelectedService.setResult(null);
			const expected = cold('(bc)', {
				b: getServices({ payload: null }),
				c: setServicesListLoading({ payload: true }),
			});
			expect(effects.initializeWizardServiceChoice$).toBeObservable(expected);
		});
	});

	describe('initializeWizardDateChoice$', () => {
		beforeEach(() => {
			actions$ = hot('a', { a: initializeWizardDateChoice() });
		});

		it('calls actions with not null params when in store are selectedService, selectedMaster, selectedSchedule', () => {
			const expected = cold('(bcdefghi)', {
				b: getMasters({ payload: { serviceId: MockService.id, masterId: null } }),
				c: getDates({ payload: { serviceId: MockService.id, masterId: MockMasterDto.id } }),
				d: getMonths({ payload: { currentMonth: new Date().getMonth().toString() } }),
				e: setFwdBtnDisabled({ payload: false }),
				f: setFwdBtnVisible({ payload: true }),
				g: setMastersFilterComponentLoading({ payload: true }),
				h: setMonthsFilterComponentLoading({ payload: true }),
				i: setCalendarComponentLoading({ payload: true }),
			});
			expect(effects.initializeWizardDateChoice$).toBeObservable(expected);
		});

		it('calls actions with null params when in store are not selectedService, selectedMaster, selectedSchedule', () => {
			selectSelectedService.setResult(null);
			selectSelectedMaster.setResult(null);
			selectSelectedSchedule.setResult(null);
			const expected = cold('(bcdefghi)', {
				b: getMasters({ payload: { serviceId: null, masterId: null } }),
				c: getDates({ payload: { serviceId: null, masterId: null } }),
				d: getMonths({ payload: { currentMonth: new Date().getMonth().toString() } }),
				e: setFwdBtnDisabled({ payload: true }),
				f: setFwdBtnVisible({ payload: true }),
				g: setMastersFilterComponentLoading({ payload: true }),
				h: setMonthsFilterComponentLoading({ payload: true }),
				i: setCalendarComponentLoading({ payload: true }),
			});
			expect(effects.initializeWizardDateChoice$).toBeObservable(expected);
		});
	});

	it('initializeWizardConfirmStep$', () => {
		actions$ = hot('a', { a: initializeWizardConfirmStep() });
		const expected = cold('(bc)', {
			b: setFwdBtnDisabled({ payload: true }),
			c: setFwdBtnVisible({ payload: false }),
		});
		expect(effects.initializeWizardConfirmStep$).toBeObservable(expected);
	});
});
