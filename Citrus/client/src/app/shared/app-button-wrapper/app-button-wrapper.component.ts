import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ButtonStatusService } from 'src/app/services/button-status.service';
import { RouteService } from 'src/app/services/route.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-button-wrapper',
  templateUrl: './app-button-wrapper.component.html',
  styleUrls: ['./app-button-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppButtonWrapperComponent implements OnInit {
  @Input() label: string = '';
  @Input() url: string = '';

  constructor(
    public storage: StorageService,
    public routeWithUrl: RouteService,
    public status: ButtonStatusService
  ) { };

  ngOnInit(): void {
    this.status.setButtonStatus();
  };
}
