import { UserModel } from './../../../models/user-model';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ButtonConf } from 'src/app/shared/app-button-group/app-button-group.component';
import { btnConfMap } from 'src/app/models/header-button-conf';

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
      this.buttonConf = btnConfMap.getBtnConfByUser(this.userModel);
      this.cdr.markForCheck();
    }));
  };
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  };
};
