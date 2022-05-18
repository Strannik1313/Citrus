import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';
import { OrderData } from 'src/app/models/order-data';
import { OrderListButtonConfiguration } from 'src/app/models/order-list-button-configuration';
import { PaginatorData } from 'src/app/models/paginator-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-page-wrapper',
  templateUrl: './account-page-wrapper.component.html',
  styleUrls: ['./account-page-wrapper.component.scss']
})
export class AccountPageWrapperComponent implements OnDestroy {
  public haveAccountData: boolean = false;
  public authorizedClientData: AuthorizedClientData = new AuthorizedClientData;
  public disabledForm: boolean = false;
  public ordersArray: OrderData[] = [];
  public buttonConfiguration: Array<OrderListButtonConfiguration> = [{
    buttonLabel: "Изменить",
    action: "change",
    color: ""
  },
  {
    buttonLabel: "Удалить",
    action: "cancel",
    color: "warn"
  }];
  public disabled: boolean = false;
  public paginatorData: PaginatorData = new PaginatorData;
  private subscriptions: Subscription[] = [];
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private pageSize: number = 3;
  private startItem: number = 1;

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private storage: StorageService,
    private route: Router
  ) {
    this.subscriptions.push(this.storage.authorizedUserData$.subscribe(data => {
      this.authorizedClientData = {
        ...data
      };
    }));
    this.subscriptions.push(this.storage.haveAccountData$.subscribe(data => {
      this.haveAccountData = data;
    }));
    this.getOrdersData(this.pageSize, this.startItem);
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  };

  getOrdersData(pageSize: number, startItem: number): void {
    this.disabled = true;
    this.subscriptions.push(this.http.getPersonalOrders(pageSize, startItem).subscribe(data => {
      if (data.length > 0) {
        let paginatorLenght = Math.ceil(data[0].quantityOfOrders);
        this.paginatorData = {
          length: paginatorLenght,
          pageSize: 3
        };
        this.ordersArray = [
          ...data
        ];
        this.disabled = false;
      } else {
        this.disabled = true;
        this.paginatorData = {
          length: 0,
          pageSize: 3
        };
        this.ordersArray = [];
        this.disabled = false;
      };
    }))
  };

  onPaginatorClick(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.startItem = e.pageIndex * e.pageSize + 1;
    this.getOrdersData(this.pageSize, this.startItem);
  };

  onButtonClicked(e: { action: string, orderId: number }): void {
    switch (e.action) {
      case 'cancel':
        this.subscriptions.push(this.http.cancelOrder(e.orderId).subscribe((response) => {
            if (response.statusCode === 0) {
              this.getOrdersData(this.pageSize, this.startItem);
            };
          }))
        break;
      case 'change':
        let clientOrder: OrderData[] = this.ordersArray.filter(el => {
          return el.orderId === e.orderId;
        });
        this.storage.setClientData({
          name: 'admin',
          master: clientOrder[0].master,
          masterId: clientOrder[0].masterId,
          masterWasSelected: true,
          service: clientOrder[0].service,
          clientName: clientOrder[0].clientName,
          clientSurname: clientOrder[0].clientSurname,
          phoneNumber: clientOrder[0].phoneNumber,
          comments: clientOrder[0].comments
        });
        this.storage.setAccessMap('/crossroad');
        this.route.navigate(['/crossroad']);
        break;
      default:
        break;
    };
  };

  logout(): void {
    this.http.logout();
  };

  disableForm(value: boolean): boolean {
    return this.disabledForm = value;
  };

  setFormValue(e: any) {
    this.disableForm(true);
    this.subscriptions.push(this.http.personal(e).subscribe(
      {
        next: () => {
          this.disableForm(false);
        },
        error: (error) => {
          this.disableForm(false);
          this._snackBar.open(error.error.message, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    ));
  };
}
