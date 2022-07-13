import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface ButtonConf {
  label: string,
  url: string,
  user: UserType,
  class: string
};

interface UserType {
  admin: boolean,
  auth: boolean,
  unauth: boolean
};

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUIComponent implements OnChanges {
  @Input() isAuthorized: boolean | null = false;
  @Input() isAdmin: boolean | null = false;
  public temp: boolean = false;
  public currentUser: UserType = {
    admin: false,
    auth: false,
    unauth: true
  };
  public buttonConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    user: {
      admin: true,
      auth: true,
      unauth: true
    },
    class: 'btn__home'
  },
  {
    label: 'Войти',
    url: '/login',
    user: {
      admin: false,
      auth: false,
      unauth: true
    },
    class: 'btn__auth__right'
  },
  {
    label: 'Регистрация',
    url: '/register',
    user: {
      admin: false,
      auth: false,
      unauth: true
    },
    class: 'btn__auth__left'
  },
  {
    label: 'Личный кабинет',
    url: '/account',
    user: {
      admin: false,
      auth: true,
      unauth: false
    },
    class: 'btn__auth__left'
  },
  {
    label: 'Личный кабинет',
    url: '/admin',
    user: {
      admin: true,
      auth: false,
      unauth: false
    },
    class: 'btn__auth__left'
  },
  {
    label: 'Выйти',
    url: '/logout',
    user: {
      admin: true,
      auth: true,
      unauth: false
    },
    class: 'btn__auth__right'
  },
  {
    label: 'Назад',
    url: '/..',
    user: {
      admin: true,
      auth: true,
      unauth: true
    },
    class: 'btn__back'
  }];

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      const chng = changes[propName];
      const curnt = chng.currentValue;
      const prev = chng.previousValue;
      if (curnt !== prev) {
        switch (propName) {
          case 'isAuthorized':
            if (curnt) {
              this.currentUser = {
                ...this.currentUser,
                auth: true,
                unauth: false
              };
            } else {
              this.currentUser = {
                ...this.currentUser,
                auth: false,
                unauth: true
              };
            };
            break;
          case 'isAdmin':
            if (curnt) {
              this.currentUser = this.currentUser = {
                ...this.currentUser,
                admin: true,
                unauth: false
              };
            } else {
              this.currentUser = this.currentUser = {
                ...this.currentUser,
                admin: false,
                unauth: true
              };
            };
            break;
          default:
            break;
        };
      };
    };
  };

  trackByFn(index: number, item: ButtonConf): string {
    return item.url;
  };

  compareValues(value: UserType): boolean {
    if (this.currentUser.admin) {
      return value.admin;
    };
    if (this.currentUser.auth) {
      return value.auth;
    };
    return value.unauth;
  };
};
