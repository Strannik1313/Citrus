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
import { Schedule } from '@interfaces/Schedule';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { ConfirmForm } from '@interfaces/ConfirmForm';
import { ComponentsLoadingState } from '@interfaces/ComponentsLoadingState';
import { ScheduleDto } from '@models/ScheduleDto';
import { UserDto } from '@models/UserDto';
import { UserRoles } from '@enums/UserRoles';
import { AuthForm } from '@interfaces/AuthForm';
import { OrderDto } from '@models/OrderDto';
import { selectUrlBeforeAuthNavigation } from '@state-management/main-feature/main.reducer';
import { selectUser } from '@state-management/auth-feature/auth.reducer';

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

export const MockUrl = '/mock';

export const MockUserDto: UserDto = {
	email: 'mockEmail',
	phoneNumber: 8,
	id: 'mockId',
	role: UserRoles.USER,
};

export const MockWizardSelectors: MockSelector[] = [
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
	{
		selector: selectUrlBeforeAuthNavigation,
		value: MockUrl,
	},
	{
		selector: selectUser,
		value: MockUserDto,
	},
];

export const MockPageableMasterDto = {
	result: [MockMasterDto],
	total: 100,
	current: 1,
};

export const MockAuthForm: AuthForm = {
	email: 'mockEmail',
	password: '123',
};

export const MockOrderDto: OrderDto = {
	name: 'mockName',
	surname: 'mockSurname',
	phoneNumber: 'mockPhone',
};

export const mockRouterUrl = '/mock';
