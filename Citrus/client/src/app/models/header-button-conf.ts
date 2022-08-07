import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { UserModel } from '@models/user-model';
import { ButtonConf } from '@shared/app-button-group/app-button-group.component';

const AuthBtnConf: Array<ButtonConf> = [
	{
		label: 'Личный кабинет',
		url: NAVIGATE_ROUTES.account,
		class: 'btn__auth__left',
	},
	{
		label: 'Выйти',
		url: NAVIGATE_ROUTES.logout,
		class: 'btn__auth__right',
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
