import { ComponentProviderService } from './../../../services/component-provider.service';
import { AdminCreateMasterPanelWrapperComponent } from './../admin-create-master-panel-wrapper/admin-create-master-panel-wrapper.component';
import { AdHostDirective } from '../../../directives/ad-host';
import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin-page-wrapper',
  templateUrl: './admin-page-wrapper.component.html',
  styleUrls: ['./admin-page-wrapper.component.scss']
})
export class AdminPageWrapperComponent implements OnInit {

  component = AdminCreateMasterPanelWrapperComponent
  @ViewChild(AdHostDirective, { static: true }) adHost!: AdHostDirective;
  constructor(
    private router: Router,
    private http: HttpService,
    private provider: ComponentProviderService
  ) { }

  ngOnInit(): void {
  };

  loadAdminPanelContent(key: string):void {
    this.destroyWindow();
    this.provider.getComponent({
      host: this.adHost,
      key
    });
  }
  destroyWindow():void {
    this.provider.destroyComponent(this.adHost);
  };

  logout(): void {
    this.http.logout();
  };
}
