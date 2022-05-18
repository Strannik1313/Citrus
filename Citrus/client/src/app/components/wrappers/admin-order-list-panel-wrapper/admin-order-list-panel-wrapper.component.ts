import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order-data';
import { PaginatorData } from 'src/app/models/paginator-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-order-list-panel-wrapper',
  templateUrl: './admin-order-list-panel-wrapper.component.html',
  styleUrls: ['./admin-order-list-panel-wrapper.component.scss']
})
export class AdminOrderListPanelWrapperComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = []
  ordersArray: Array<OrderData> = []
  paginatorData: PaginatorData = new PaginatorData
  disabled: boolean = false
  pageSize: number = 3
  startItem: number = 1
  constructor(
    private http: HttpService,
    private storage: StorageService,
    private route: Router
  ) {
    this.getOrdersData(this.pageSize, this.startItem)
  }
  getOrdersData(pageSize: number, startItem: number): void {
    this.disabled = true
    this.subscriptions.push(this.http.getOrdersData(pageSize, startItem).subscribe(data => {
      if (data.length > 0) {
        let paginatorLenght = Math.ceil(data[0].quantityOfOrders)
        this.paginatorData = {
          length: paginatorLenght,
          pageSize: 3
        }
        this.ordersArray = data
        this.disabled = false
      } else {
        this.disabled = true
        this.paginatorData = {
          length: 0,
          pageSize: 3
        }
        this.ordersArray = []
        this.disabled = false
      }

    }))
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onButtonClick(e: { action: string, orderId: number }): void {
    switch (e.action) {
      case 'cancel':
        this.subscriptions.push(this.http.cancelOrder(e.orderId).subscribe({
          next: (response) => {
            if (response.statusCode == 0) {
              this.getOrdersData(this.pageSize, this.startItem)
            }
          }
        }))
        break;
      case 'done':
        this.subscriptions.push(this.http.completeOrder(e.orderId).subscribe({
          next: (response) => {
            if (response.statusCode == 0) {
              this.getOrdersData(this.pageSize, this.startItem)
            }
          }
        }))
        break;
      case 'change':
        let clientOrder: OrderData[] = this.ordersArray.filter(el => {
          return el.orderId == e.orderId
        })
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
        })
        this.storage.setAccessMap('/crossroad')
        this.route.navigate(['/crossroad'])
        break;

      default:
        break;
    }
  }
  onPaginatorChanged(e: PageEvent): void {
    this.pageSize = e.pageSize
    this.startItem = e.pageIndex * e.pageSize + 1
    this.getOrdersData(this.pageSize, this.startItem)
  }
}
