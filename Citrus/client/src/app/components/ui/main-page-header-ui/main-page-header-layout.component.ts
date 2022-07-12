import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface ButtonConf {
  label: string,
  url: string,
  user: CurrentUser
}

enum CurrentUser {
  Admin = 'admin',
  Auth = 'auth',
  Unauth = 'unauth',
  All = 'all'
}

@Component({
  selector: 'app-main-page-header-layout',
  templateUrl: './main-page-header-layout.component.html',
  styleUrls: ['./main-page-header-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageHeaderLayoutComponent implements OnChanges {
  @Input() isAuthorized: boolean | null = false
  @Input() isAdmin: boolean | null = false
  public currentUser: CurrentUser = CurrentUser.Unauth
  public buttonConf: Array<ButtonConf> = [{
    label: 'На главную',
    url: '/home',
    user: CurrentUser.All
  },
  {
    label: 'Войти',
    url: '/login',
    user: CurrentUser.Unauth
  },
  {
    label: 'Регистрация',
    url: '/register',
    user: CurrentUser.Unauth
  },
  {
    label: 'Личный кабинет',
    url: '/account',
    user: CurrentUser.Auth
  },
  {
    label: 'Личный кабинет',
    url: '/admin',
    user: CurrentUser.Admin
  },
  {
    label: 'Выйти',
    url: '/logout',
    user: CurrentUser.All
  },
  {
    label: 'Назад',
    url: '/..',
    user: CurrentUser.All
  },]

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      const chng = changes[propName];
      const cur = chng.currentValue;
      const prev = chng.previousValue;
      if (cur !== prev) {
        switch (propName) {
          case 'isAuthorized':
            if (cur) {
              this.currentUser = CurrentUser.Auth
            } else {
              this.currentUser = CurrentUser.Unauth
            }
            break;
          case 'isAdmin':
            if (cur) {
              this.currentUser = CurrentUser.Admin
            } else {
              if (this.currentUser !== CurrentUser.Auth) {
                this.currentUser = CurrentUser.Unauth
              }
            }
            break;
          default:
            break;
        }
      }
    }
  }

  trackByFn(index:number, item: ButtonConf): string {
    return item.url
  }
}
