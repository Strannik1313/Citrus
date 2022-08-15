import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { UserModel } from '@models/user-model';
import { ButtonConf } from '@shared/app-button-group/app-button-group.component';

export enum ButtonPositionEnum {
	LEFT = 'left',
	RIGHT = 'right',
}

const AuthBtnConf: Array<ButtonConf> = [
	{
		label: 'Личный кабинет',
		url: NAVIGATE_ROUTES.account,
		buttonPosition: ButtonPositionEnum.LEFT,
	},
	{
		label: 'Выйти',
		url: NAVIGATE_ROUTES.logout,
		buttonPosition: ButtonPositionEnum.RIGHT,
	},
];
const UnauthBtnConf: Array<ButtonConf> = [
	{
		label: 'Войти',
		url: NAVIGATE_ROUTES.login,
		buttonPosition: ButtonPositionEnum.RIGHT,
	},
	{
		label: 'Регистрация',
		url: NAVIGATE_ROUTES.register,
		buttonPosition: ButtonPositionEnum.LEFT,
	},
];

export const btnConfMap: Record<UserModel, Array<ButtonConf>> = {
	[UserModel.AUTH]: AuthBtnConf,
	[UserModel.UNAUTH]: UnauthBtnConf,
	[UserModel.ADMIN]: UnauthBtnConf,
};
