import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { UserModel } from '@models/user-model';
import { ButtonConf } from '@shared/app-button-group/app-button-group.component';

export enum ButtonPositionEnum {
	LEFT,
	RIGHT,
}

const AuthBtnConf: Array<ButtonConf> = [
	{
		label: 'Личный кабинет',
		url: NAVIGATE_ROUTES.account,
		class: 'btn__auth__left',
		buttonPosition: ButtonPositionEnum.LEFT,
	},
	{
		label: 'Выйти',
		url: NAVIGATE_ROUTES.logout,
		class: 'btn__auth__right',
		buttonPosition: ButtonPositionEnum.RIGHT,
	},
];
const UnauthBtnConf: Array<ButtonConf> = [
	{
		label: 'Войти',
		url: NAVIGATE_ROUTES.login,
		class: 'btn__auth__right',
	},
	{
		label: 'Регистрация',
		url: NAVIGATE_ROUTES.register,
		class: 'btn__auth__left',
	},
];

export enum BtnConfMapStateEnum {
	AUTH,
	UNAUTH,
}

export const btnConfMap2: Record<BtnConfMapStateEnum, Array<ButtonConf>> = {
	[BtnConfMapStateEnum.AUTH]: AuthBtnConf,
	[BtnConfMapStateEnum.UNAUTH]: UnauthBtnConf,
};

export const btnConfMap = {
	btnConf: {
		auth: AuthBtnConf,
		unauth: UnauthBtnConf,
	},
	getBtnConfByUser(value: UserModel): Array<ButtonConf> {
		switch (value) {
			case UserModel.Auth:
				return this.btnConf.auth;
			case UserModel.Unauth:
				return this.btnConf.unauth;
			default:
				return this.btnConf.unauth;
		}
	},
};

export class BtnConfMap {
	static readonly btnConf = {
		auth: AuthBtnConf,
		unauth: UnauthBtnConf,
	};

	static getBtnConfByUser(value: UserModel): Array<ButtonConf> {
		switch (value) {
			case UserModel.Auth:
				return BtnConfMap.btnConf.auth;
			case UserModel.Unauth:
				return BtnConfMap.btnConf.unauth;
			default:
				return BtnConfMap.btnConf.unauth;
		}
	}
}
