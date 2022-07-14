import { ButtonConf } from "../shared/app-button-group/app-button-group/app-button-group.component"

export const AdminBtnConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    class: 'btn__home'
},
{
    label: 'Личный кабинет',
    url: '/admin',
    class: 'btn__auth__left'
},
{
    label: 'Выйти',
    url: '/logout',
    class: 'btn__auth__right'
},
{
    label: 'Назад',
    url: '/..',
    class: 'btn__back'
}
]
export const AuthBtnConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    class: 'btn__home'
},
{
    label: 'Личный кабинет',
    url: '/account',
    class: 'btn__auth__left'
},
{
    label: 'Выйти',
    url: '/logout',
    class: 'btn__auth__right'
},
{
    label: 'Назад',
    url: '/..',
    class: 'btn__back'
}
]
export const UnauthBtnConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    class: 'btn__home'
},
{
    label: 'Войти',
    url: '/login',
    class: 'btn__auth__right'
},
{
    label: 'Регистрация',
    url: '/register',
    class: 'btn__auth__left'
},
{
    label: 'Назад',
    url: '/..',
    class: 'btn__back'
}
]