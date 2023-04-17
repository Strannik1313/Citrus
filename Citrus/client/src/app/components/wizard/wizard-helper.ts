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
				return !!client.masterId !== null && !!client.masterName && !!client.dateOrder;
			case WizardStepperEnum.CONFIRM_PAGE:
				return !!client.name !== null && !!client.surname && !!client.phoneNumber;
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

	static updatePhoneNumber(phone: string): string {
		const regex = /([0-9]{1,2})?([0-9]{1,3})?([0-9]{1,2})?([0-9]{1,2})?/;
		let justNumbers;
		let mask;
		if (phone[0] === '+') {
			justNumbers = phone
				.match(/\d{1,}/g)
				?.slice(1)
				.join('');
		} else {
			justNumbers = phone;
		}
		justNumbers = justNumbers ?? '';
		switch (justNumbers.length) {
			case 1:
				mask = '+375($1';
				break;
			case 2:
				mask = '+375($1)';
				break;
			case 3:
				mask = '+375($1)$2';
				break;
			case 4:
				mask = '+375($1)$2';
				break;
			case 5:
				mask = '+375($1)$2';
				break;
			case 6:
				mask = '+375($1)$2-$3';
				break;
			case 7:
				mask = '+375($1)$2-$3';
				break;
			case 8:
				mask = '+375($1)$2-$3-$4';
				break;
			case 9:
				mask = '+375($1)$2-$3-$4';
				break;
			case 0:
				return justNumbers;
			default:
				mask = '+375($1)$2-$3-$4';
				break;
		}
		return justNumbers.replace(regex, mask);
	}
}
