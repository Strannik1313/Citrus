import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonConf } from 'src/app/models/header-button-conf';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUIComponent  {

  @Input() buttonConf: Array<ButtonConf> = [];
  trackByFn(index: number, item: ButtonConf): string {
    return item.url;
  };
};
