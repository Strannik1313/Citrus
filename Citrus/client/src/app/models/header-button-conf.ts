import { ButtonConf } from '../shared/app-button-group/app-button-group.component';
import { UserModel } from './user-model';

const AdminBtnConf: Array<ButtonConf> = [
	{
		label: 'На главную',
		url: '/home',
		class: 'btn__home',
	},
	{
		label: 'Личный кабинет',
		url: '/admin',
		class: 'btn__auth__left',
	},
	{
		label: 'Выйти',
		url: '/logout',
		class: 'btn__auth__right',
	},
	{
		label: 'Назад',
		url: '/..',
		class: 'btn__back',
	},
];
const AuthBtnConf: Array<ButtonConf> = [
	{
		label: 'На главную',
		url: '/home',
		class: 'btn__home',
	},
	{
		label: 'Личный кабинет',
		url: '/account',
		class: 'btn__auth__left',
	},
	{
		label: 'Выйти',
		url: '/logout',
		class: 'btn__auth__right',
	},
	{
		label: 'Назад',
		url: '/..',
		class: 'btn__back',
	},
];
const UnauthBtnConf: Array<ButtonConf> = [
	{
		label: 'На главную',
		url: '/home',
		class: 'btn__home',
	},
	{
		label: 'Войти',
		url: '/login',
		class: 'btn__auth__right',
	},
	{
		label: 'Регистрация',
		url: '/register',
		class: 'btn__auth__left',
	},
	{
		label: 'Назад',
		url: '/..',
		class: 'btn__back',
	},
];

export const btnConfMap = {
	btnConf: {
		admin: AdminBtnConf,
		auth: AuthBtnConf,
		unauth: UnauthBtnConf,
	},
	getBtnConfByUser(value: UserModel): Array<ButtonConf> {
		switch (value) {
			case UserModel.Admin:
				return this.btnConf.admin;
			case UserModel.Auth:
				return this.btnConf.auth;
			case UserModel.Unauth:
				return this.btnConf.unauth;
			default:
				return this.btnConf.unauth;
		}
	},
};
