import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-page-header-layout',
  templateUrl: './main-page-header-layout.component.html',
  styleUrls: ['./main-page-header-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageHeaderLayoutComponent {
  @Input() isAuthorized: boolean | null = false
  @Input() isAdmin: boolean | null = false
}
