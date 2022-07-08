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
    private factory: ComponentProviderService
  ) { }

  ngOnInit(): void {
  };

  loadAdminPanelContent(key: string):void {
    this.destroyWindow()
    this.factory.getComponent({
      host: this.adHost,
      key
    })
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    // viewContainerRef.createComponent<AdminCreateMasterPanelWrapperComponent>(this.component);
  }
  destroyWindow():void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.remove();
  };

  goToCreateMaster(): void {
    // this.router.navigate(['/admin/create-master']);
    // this.loadAdminPanelContent()
  };

  goToCreateMasterService(): void {
    this.router.navigate(['/admin/create-service']);
  };

  goToOrderList(): void {
    this.router.navigate(['/admin/order-list']);
  };

  logout(): void {
    this.http.logout();
  };
}
