import { UserModel } from './../../../models/user-model';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonConf, ButtonType, HeaderButtonConf } from 'src/app/models/header-button-conf';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUIComponent implements OnChanges {

  @Input() userModel: UserModel | null = UserModel.Unauth
  public buttonConf: Array<ButtonConf> = HeaderButtonConf;
  ngOnChanges(changes: SimpleChanges): void {
    const chng = changes['userModel'].currentValue;
    switch (chng) {
      case UserModel.Admin:
        this.buttonConf.forEach(btn => {
          btn.user === ButtonType.admin || btn.user === ButtonType.allAuth || btn.user === ButtonType.all ? btn.isVisible = true : btn.isVisible = false;
        });
        break;
      case UserModel.Auth:
        this.buttonConf.forEach(btn => {
          btn.user === ButtonType.auth || btn.user === ButtonType.allAuth || btn.user === ButtonType.all ? btn.isVisible = true : btn.isVisible = false;
        });
        break;
      case UserModel.Unauth:
        this.buttonConf.forEach(btn => {
          btn.user === ButtonType.unauth || btn.user === ButtonType.all ? btn.isVisible = true : btn.isVisible = false;
        });
        break;
      default:
        break;
    };
  };

  trackByFn(index: number, item: ButtonConf): string {
    return item.url;
  };
};
