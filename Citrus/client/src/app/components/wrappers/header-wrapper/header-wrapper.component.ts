import { AdminBtnConf, AuthBtnConf, UnauthBtnConf } from './../../../models/header-button-conf';
import { UserModel } from './../../../models/user-model';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ButtonConf } from 'src/app/shared/app-button-group/app-button-group/app-button-group.component';

@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderWrapperComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public buttonConf: Array<ButtonConf> = [];
  public userModel: UserModel = UserModel.Unauth;
  constructor(
    private storage: StorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions.push(this.storage?.currentUserModel$.subscribe(data => {
      this.userModel = data;
      this.setButtonConf();
    }));
  };
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  };
  setButtonConf(): void {
    switch (this.userModel) {
      case UserModel.Admin:
        this.buttonConf = [...AdminBtnConf];
        break;
      case UserModel.Auth:
        this.buttonConf = [...AuthBtnConf];
        break;
      case UserModel.Unauth:
        this.buttonConf = [...UnauthBtnConf];
        break;
      default:
        break;
    };
    this.cdr.markForCheck();
  };
};
