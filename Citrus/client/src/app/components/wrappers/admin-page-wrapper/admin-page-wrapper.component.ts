import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

enum AdminPanelContent {
  CreateMaster = 'create-master',
  CreateService = 'create-service',
  OrderList = 'order-list',
  None = ''
}

@Component({
  selector: 'app-admin-page-wrapper',
  templateUrl: './admin-page-wrapper.component.html',
  styleUrls: ['./admin-page-wrapper.component.scss']
})
export class AdminPageWrapperComponent implements OnInit {

  public adminPanelButtonConfiguration: Array<any> = [{
    buttonLabel: 'Создать нового мастера',
    buttonClickArg: AdminPanelContent.CreateMaster
  }, {
    buttonLabel: 'Создать новую услугу',
    buttonClickArg: AdminPanelContent.CreateService
  },
  {
    buttonLabel: 'Забронированные места',
    buttonClickArg: AdminPanelContent.OrderList
  }];
  public adminPanelContent: AdminPanelContent = AdminPanelContent.None;
  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  };

  loadAdminPanelContent(action: AdminPanelContent): void {
    this.adminPanelContent = action
  }

  trackByFn(index: number, item: { buttonLabel: string, buttonClickArg: string }): string {
    return item.buttonClickArg;
  }

  logout(): void {
    this.http.logout();
  };
}
