import { AdminCreateMasterPanelWrapperComponent } from './../admin-create-master-panel-wrapper/admin-create-master-panel-wrapper.component';
import { DialogWindowDirective } from './../../../directives/dialog-window.directive';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin-page-wrapper',
  templateUrl: './admin-page-wrapper.component.html',
  styleUrls: ['./admin-page-wrapper.component.scss']
})
export class AdminPageWrapperComponent implements OnInit {

  component = AdminCreateMasterPanelWrapperComponent
  @ViewChild(DialogWindowDirective, { static: true }) adHost!: DialogWindowDirective;
  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
  };

  loadAdminPanelContent():void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<AdminCreateMasterPanelWrapperComponent>(this.component);
  }
  destroyWindow():void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.remove();
  };

  goToCreateMaster(): void {
    // this.router.navigate(['/admin/create-master']);
    this.loadAdminPanelContent()
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
