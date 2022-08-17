import { WizardStepperEnum } from '@components/wizard/wizard.component';
import {
	CLIENT_INIT_CONFIRM,
	CLIENT_INIT_DATE,
	CLIENT_INIT_SERVICE,
	CLIENT_INIT_VALUE,
} from '@constants/client-init-value';
import { BtnStatus, CALENDAR_BTN_INIT_VALUE } from '@models/buttons-status';
import { Client } from '@models/client';
import dayjs from 'dayjs';

export class WizardHelper {
	static getCalendarBtnConf(startDay: string, month: string | null): BtnStatus {
		return {
			...CALENDAR_BTN_INIT_VALUE,
			...(dayjs(startDay).isBefore(dayjs(), 'day') && { prev: true }),
			...(dayjs(startDay).isBefore(month, 'month') && { prev: true }),
			...(dayjs(startDay).endOf('week').isAfter(month, 'month') && {
				next: true,
			}),
		};
	}
	static getMonth(): Array<string> {
		const month = [];
		for (let i = 0; i < 6; i++) {
			month.push(dayjs().startOf('month').add(i, 'month').toString());
		}
		return month;
	}
	static isClientValid(client: Client, step: WizardStepperEnum): boolean {
		switch (step) {
			case WizardStepperEnum.SERVICE_CHOICE:
				return client.serviceId !== null && !!client.serviceName;
			case WizardStepperEnum.DATE_CHOICE:
				return (
					!!client.masterId !== null &&
					!!client.masterName &&
					!!client.dateOrder
				);
			case WizardStepperEnum.CONFIRM_PAGE:
				break;
			default:
				break;
		}
		return false;
	}
	static getClientInitValue(client: Client, step: WizardStepperEnum): Client {
		switch (step) {
			case WizardStepperEnum.SERVICE_CHOICE:
				return {
					...client,
					...CLIENT_INIT_SERVICE,
				};
			case WizardStepperEnum.DATE_CHOICE:
				return {
					...client,
					...CLIENT_INIT_DATE,
				};
			case WizardStepperEnum.CONFIRM_PAGE:
				return {
					...client,
					...CLIENT_INIT_CONFIRM,
				};
			default:
				break;
		}
		return {
			...CLIENT_INIT_VALUE,
		};
	}
}
