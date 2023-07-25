import { ServiceDto } from '@models/ServiceDto';
import { MockSelector } from '@ngrx/store/testing';
import {
	selectComponentsIsLoadingState,
	selectDates,
	selectFwdBtnDisabled,
	selectIsNextBTnVisible,
	selectMasters,
	selectMonths,
	selectPrevWeekBtnDisabled,
	selectSchedules,
	selectScheduleSelectedTime,
	selectSelectedDay,
	selectSelectedMaster,
	selectSelectedMonth,
	selectSelectedSchedule,
	selectSelectedService,
	selectServices,
	selectStep,
} from '@state-management/wizard-feature/wizard.reducer';
import { Schedule } from '@models/Schedule';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { ConfirmForm } from '@models/ConfirmForm';
import { ComponentsLoadingState } from '@models/ComponentsLoadingState';
import { ScheduleDto } from '@models/ScheduleDto';

export const MockElementHeight = 20;

export const MockServiceDto: ServiceDto = {
	title: 'mockTitle',
	description: 'mockDescription',
	cost: 90,
	duration: 90,
	id: 'mockId',
};

export const MockInitialState = {};

export const MockService: ServiceDto = {
	title: 'mockTitle',
	description: 'mockDescription',
	cost: 10,
	id: '1',
	duration: 20,
};

export const MockDate = new Date(2000, 0, 0).toString();

export const MockMasterDto: MasterDto = {
	name: 'mockName',
	id: 'mockId',
	prices: [90],
	servicesId: ['mockServiceId'],
};

export const MockSchedule: Schedule = {
	masterName: 'mockName',
	cost: 90,
	duration: 90,
	freeTimesWithShifts: [],
	masterId: 'mockId',
	id: 'mockIdSchedule',
	date: MockDate,
	freetimes: [MockDate],
};

export const MockScheduleDto: ScheduleDto = {
	masterId: 'mockId',
	freetimes: [MockDate],
	id: 'mockIdSchedule',
	date: MockDate,
};

export const MockCalendarDtos: CalendarDatesDto[] = [
	{ date: MockDate, mastersId: [] },
	{ date: MockDate, mastersId: ['1'] },
];

export const MockConfirmForm: ConfirmForm = {
	name: 'mockName',
	surname: 'mockSurname',
	phoneNumber: '8',
};

export const MockLoadingState: ComponentsLoadingState = {
	wizardFirstStep: {
		isLoadingServiceList: true,
	},
	wizardSecondStep: {
		isLoadingSchedules: true,
		isLoadingMonthsFilter: true,
		isLoadingCalendar: true,
		isLoadingMasterFilter: true,
	},
};

export const MockStep = 1;

export const MockSelectors: MockSelector[] = [
	{
		selector: selectComponentsIsLoadingState,
		value: MockLoadingState,
	},
	{
		selector: selectStep,
		value: MockStep,
	},
	{
		selector: selectServices,
		value: [MockService],
	},
	{
		selector: selectFwdBtnDisabled,
		value: true,
	},
	{
		selector: selectSelectedService,
		value: MockService,
	},
	{
		selector: selectMasters,
		value: [MockMasterDto],
	},
	{
		selector: selectDates,
		value: MockCalendarDtos,
	},
	{
		selector: selectSchedules,
		value: [MockSchedule],
	},
	{
		selector: selectMonths,
		value: [MockDate],
	},
	{
		selector: selectSelectedMonth,
		value: MockDate,
	},
	{
		selector: selectPrevWeekBtnDisabled,
		value: true,
	},
	{
		selector: selectSelectedSchedule,
		value: MockSchedule,
	},
	{
		selector: selectScheduleSelectedTime,
		value: MockDate,
	},
	{
		selector: selectSelectedMaster,
		value: MockMasterDto,
	},
	{
		selector: selectSelectedDay,
		value: MockDate,
	},
	{
		selector: selectIsNextBTnVisible,
		value: true,
	},
];
