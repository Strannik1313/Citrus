import { UserModel } from './user-model';

export interface ButtonConf {
    label: string,
    url: string,
    user: string,
    isVisible: boolean,
    class: string
};

export const ButtonType = {
    admin: UserModel.Admin,
    auth: UserModel.Auth,
    unauth: UserModel.Unauth,
    all: 'all',
    allAuth: 'allAuth'
};

export const HeaderButtonConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    user: ButtonType.all,
    isVisible: false,
    class: 'btn__home'
},
{
    label: 'Войти',
    url: '/login',
    user: ButtonType.unauth,
    isVisible: false,
    class: 'btn__auth__right'
},
{
    label: 'Регистрация',
    url: '/register',
    user: ButtonType.unauth,
    isVisible: false,
    class: 'btn__auth__left'
},
{
    label: 'Личный кабинет',
    url: '/account',
    user: ButtonType.auth,
    isVisible: false,
    class: 'btn__auth__left'
},
{
    label: 'Личный кабинет',
    url: '/admin',
    user: ButtonType.admin,
    isVisible: false,
    class: 'btn__auth__left'
},
{
    label: 'Выйти',
    url: '/logout',
    user: ButtonType.allAuth,
    isVisible: false,
    class: 'btn__auth__right'
},
{
    label: 'Назад',
    url: '/..',
    user: ButtonType.all,
    isVisible: false,
    class: 'btn__back'
}]