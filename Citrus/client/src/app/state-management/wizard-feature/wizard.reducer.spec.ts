import * as fromReducer from './wizard.reducer';
import {
	changeWizardStep,
	checkIsWizardAvailable,
	resetSchedules,
	resetSelectedDay,
	resetSelectedMaster,
	resetSelectedMonth,
	resetSelectedSchedule,
	resetSelectedService,
	resetWizard,
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
	setPrevWeekBtnDisabled,
	setSchedules,
	setSchedulesComponentLoading,
	setSelectedDay,
	setSelectedMaster,
	setSelectedMonth,
	setSelectedSchedule,
	setSelectedService,
	setServices,
	setServicesListLoading,
} from '@state-management/wizard-feature/wizard.actions';
import {
	MockCalendarDtos,
	MockDate,
	MockLoadingState,
	MockMasterDto,
	MockSchedule,
	MockService,
} from '@tests/mockData/mockConstants';
import { selectComponentsIsLoadingState, selectScheduleSelectedTime } from './wizard.reducer';

describe('WizardReducer', () => {
	const { wizardInitialState } = fromReducer;

	it('return default state', () => {
		const action = {
			type: 'Unknown',
		};
		const state = fromReducer.reducer(wizardInitialState, action);
		expect(state).toBe(wizardInitialState);
	});

	it('changeWizardStep', () => {
		const state = fromReducer.reducer(wizardInitialState, changeWizardStep({ payload: 1 }));
		expect(state.step).toBe(1);
		expect(state).not.toBe(wizardInitialState);
	});

	it('checkIsWizardAvailable', () => {
		let state = fromReducer.reducer(wizardInitialState, checkIsWizardAvailable());
		expect(state.isWizardAvailable).toBe(false);
		expect(state).toBe(wizardInitialState);

		state = fromReducer.reducer(state, changeWizardStep({ payload: 1 }));
		state = fromReducer.reducer(state, checkIsWizardAvailable());
		expect(state.isWizardAvailable).toBe(true);
		expect(state).not.toBe(wizardInitialState);
	});

	it('resetWizardStep', () => {
		const modifiedInitialState = { ...wizardInitialState, step: 1 };
		const firstState = fromReducer.reducer(modifiedInitialState, resetWizardStep());
		expect(firstState.step).toBe(0);
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetWizardStep());
		expect(firstState).toBe(secondState);
	});

	it('setServices', () => {
		const services = [MockService];
		const firstState = fromReducer.reducer(wizardInitialState, setServices({ payload: services }));
		expect(firstState.services).toBe(services);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setServices({ payload: services }));
		expect(firstState).toBe(secondState);
	});

	it('setFwdBtnDisabled', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setFwdBtnDisabled({ payload: true }));
		expect(firstState.fwdBtnDisabled).toBeTrue();
		expect(firstState).toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setFwdBtnDisabled({ payload: false }));
		expect(secondState.fwdBtnDisabled).toBeFalse();
		expect(secondState).not.toBe(firstState);
	});

	it('setSelectedService', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setSelectedService({ payload: MockService }));
		expect(firstState.selectedService).toBe(MockService);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSelectedService({ payload: MockService }));
		expect(secondState).toBe(firstState);
	});

	it('resetSelectedService', () => {
		const modifiedInitialState = { ...wizardInitialState, selectedService: MockService };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSelectedService());
		expect(firstState.selectedService).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSelectedService());
		expect(secondState).toBe(firstState);
	});

	it('setMasters', () => {
		const masters = [MockMasterDto];
		const firstState = fromReducer.reducer(wizardInitialState, setMasters({ payload: masters }));
		expect(firstState.masters).toBe(masters);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setMasters({ payload: masters }));
		expect(secondState).toBe(firstState);
	});

	it('setDates', () => {
		const dates = MockCalendarDtos;
		const firstState = fromReducer.reducer(wizardInitialState, setDates({ payload: dates }));
		expect(firstState.dates).toBe(dates);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setDates({ payload: dates }));
		expect(secondState).toBe(firstState);
	});

	it('setSelectedDay', () => {
		const date = MockDate;
		const firstState = fromReducer.reducer(wizardInitialState, setSelectedDay({ payload: date }));
		expect(firstState.selectedDay).toBe(date);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSelectedDay({ payload: date }));
		expect(firstState).toBe(secondState);
	});

	it('setSchedules', () => {
		const schedules = [MockSchedule];
		const firstState = fromReducer.reducer(wizardInitialState, setSchedules({ payload: schedules }));
		expect(firstState.schedules).toBe(schedules);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSchedules({ payload: schedules }));
		expect(secondState).toBe(firstState);
	});

	it('setSelectedSchedule', () => {
		const schedule = MockSchedule;
		const firstState = fromReducer.reducer(wizardInitialState, setSelectedSchedule({ payload: schedule }));
		expect(firstState.selectedSchedule).toBe(schedule);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSelectedSchedule({ payload: schedule }));
		expect(secondState).toBe(firstState);
	});

	it('setSelectedMaster', () => {
		const master = MockMasterDto;
		const firstState = fromReducer.reducer(wizardInitialState, setSelectedMaster({ payload: master }));
		expect(firstState.selectedMaster).toBe(master);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSelectedMaster({ payload: master }));
		expect(secondState).toBe(firstState);
	});

	it('setMonths', () => {
		const months = [MockDate];
		const firstState = fromReducer.reducer(wizardInitialState, setMonths({ payload: { months } }));
		expect(firstState.months).toBe(months);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setMonths({ payload: { months } }));
		expect(secondState).toBe(firstState);
	});

	it('setSelectedMonth', () => {
		const month = MockDate;
		const firstState = fromReducer.reducer(wizardInitialState, setSelectedMonth({ payload: month }));
		expect(firstState.selectedMonth).toBe(month);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSelectedMonth({ payload: month }));
		expect(secondState).toBe(firstState);
	});

	it('setPrevWeekBtnDisabled', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setPrevWeekBtnDisabled({ payload: true }));
		expect(firstState.prevWeekBtnDisabled).toBe(true);
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setPrevWeekBtnDisabled({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('resetSelectedMaster', () => {
		const modifiedInitialState = { ...wizardInitialState, selectedMaster: MockMasterDto };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSelectedMaster());
		expect(firstState.selectedMaster).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSelectedMaster());
		expect(secondState).toBe(firstState);
	});

	it('resetSelectedDay', () => {
		const modifiedInitialState = { ...wizardInitialState, selectedDay: MockDate };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSelectedDay());
		expect(firstState.selectedDay).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSelectedDay());
		expect(secondState).toBe(firstState);
	});

	it('resetSelectedMonth', () => {
		const modifiedInitialState = { ...wizardInitialState, selectedMonth: MockDate };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSelectedMonth());
		expect(firstState.selectedMonth).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSelectedMonth());
		expect(secondState).toBe(firstState);
	});

	it('resetSelectedSchedule', () => {
		const modifiedInitialState = { ...wizardInitialState, selectedSchedule: MockSchedule };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSelectedSchedule());
		expect(firstState.selectedSchedule).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSelectedSchedule());
		expect(secondState).toBe(firstState);
	});

	it('resetSchedules', () => {
		const modifiedInitialState = { ...wizardInitialState, schedules: [MockSchedule] };
		const firstState = fromReducer.reducer(modifiedInitialState, resetSchedules());
		expect(firstState.schedules).toBeNull();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetSchedules());
		expect(secondState).toBe(firstState);
	});

	it('setServicesListLoading', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setServicesListLoading({ payload: true }));
		expect(firstState.isServicesListLoading).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setServicesListLoading({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('setMastersFilterComponentLoading', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setMastersFilterComponentLoading({ payload: true }));
		expect(firstState.isMastersFilterLoading).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setMastersFilterComponentLoading({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('setMonthsFilterComponentLoading', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setMonthsFilterComponentLoading({ payload: true }));
		expect(firstState.isMonthsFilterLoading).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setMonthsFilterComponentLoading({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('setCalendarComponentLoading', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setCalendarComponentLoading({ payload: true }));
		expect(firstState.isCalendarLoading).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setCalendarComponentLoading({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('setSchedulesComponentLoading', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setSchedulesComponentLoading({ payload: true }));
		expect(firstState.isSchedulesLoading).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setSchedulesComponentLoading({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	it('resetWizard', () => {
		const modifiedInitialState = { ...wizardInitialState, step: 100 };
		const firstState = fromReducer.reducer(modifiedInitialState, resetWizard());
		expect(firstState).toEqual(wizardInitialState);
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, resetWizard());
		expect(secondState).toBe(firstState);
	});

	it('setFwdBtnVisible', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setFwdBtnVisible({ payload: false }));
		expect(firstState.isNextBTnVisible).toBeFalse();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setFwdBtnVisible({ payload: false }));
		expect(secondState).toBe(firstState);
	});

	it('setAcceptPageAccess', () => {
		const firstState = fromReducer.reducer(wizardInitialState, setAcceptPageAccess({ payload: true }));
		expect(firstState.isNextBTnVisible).toBeTrue();
		expect(firstState).not.toBe(wizardInitialState);

		const secondState = fromReducer.reducer(firstState, setAcceptPageAccess({ payload: true }));
		expect(secondState).toBe(firstState);
	});

	describe('selectors', () => {
		it('selectScheduleSelectedTime selector return null', () => {
			const state = { ...wizardInitialState, selectedSchedule: MockSchedule };
			const result = selectScheduleSelectedTime.projector(state.selectedSchedule);
			expect(result).toBeNull();
		});

		it('selectScheduleSelectedTime selector return null if schedule is null', () => {
			const state = { ...wizardInitialState, selectedSchedule: null };
			const result = selectScheduleSelectedTime.projector(state.selectedSchedule);
			expect(result).toBeNull();
		});

		it('selectScheduleSelectedTime selector return preorder', () => {
			const state = { ...wizardInitialState, selectedSchedule: { ...MockSchedule, preOrder: MockDate } };
			const result = selectScheduleSelectedTime.projector(state.selectedSchedule);
			expect(result).toEqual(MockDate);
		});

		it('selectComponentsIsLoadingState', () => {
			const state = {
				...wizardInitialState,
				isServicesListLoading: true,
				isMastersFilterLoading: true,
				isMonthsFilterLoading: true,
				isCalendarLoading: true,
				isSchedulesLoading: true,
			};
			const result = selectComponentsIsLoadingState.projector(
				state.isServicesListLoading,
				state.isMastersFilterLoading,
				state.isMonthsFilterLoading,
				state.isCalendarLoading,
				state.isSchedulesLoading,
			);
			expect(result).toEqual(MockLoadingState);
		});
	});
});
