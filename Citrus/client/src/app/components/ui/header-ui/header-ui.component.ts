import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface ButtonConf {
  label: string,
  url: string,
  user: string,
  class: string
};

interface UserType {
  admin: string,
  auth: string,
  allAuth: string,
  unauth: string,
  all: string
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
  public currentUserType: UserType = {
    admin: 'admin',
    auth: 'auth',
    unauth: 'unauth',
    allAuth: 'allAuth',
    all: 'all'
  };
  public currentUser: string = this.currentUserType.unauth
  public buttonConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    user: this.currentUserType.all,
    class: 'btn__home'
  },
  {
    label: 'Войти',
    url: '/login',
    user: this.currentUserType.unauth,
    class: 'btn__auth__right'
  },
  {
    label: 'Регистрация',
    url: '/register',
    user: this.currentUserType.unauth,
    class: 'btn__auth__left'
  },
  {
    label: 'Личный кабинет',
    url: '/account',
    user: this.currentUserType.auth,
    class: 'btn__auth__left'
  },
  {
    label: 'Личный кабинет',
    url: '/admin',
    user: this.currentUserType.admin,
    class: 'btn__auth__left'
  },
  {
    label: 'Выйти',
    url: '/logout',
    user: this.currentUserType.allAuth,
    class: 'btn__auth__right'
  },
  {
    label: 'Назад',
    url: '/..',
    user: this.currentUserType.all,
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
              this.currentUser = this.currentUserType.auth;
            } else {
              this.currentUser = this.currentUserType.unauth;
            };
            break;
          case 'isAdmin':
            if (curnt) {
              this.currentUser = this.currentUserType.admin;
            } else {
              if (this.currentUser !== this.currentUserType.auth) {
                this.currentUser = this.currentUserType.unauth;
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
};
