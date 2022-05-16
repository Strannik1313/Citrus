import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order-data';
import { PaginatorData } from 'src/app/models/paginator-data';
import { HttpService } from 'src/app/services/http.service';

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
    private http: HttpService
  ) { 
    this.disabled = true
    this.subscriptions.push(this.http.getOrdersData(this.pageSize, this.startItem).subscribe(data => {
      let paginatorLenght = Math.ceil(data[0].quantityOfOrders)
      this.paginatorData = {
        length: paginatorLenght,
        pageSize: 3
      }
      this.ordersArray = data
      this.disabled = false
    }))
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
  onSelectionChange(e: string): void {
    console.log(e)
    // написать один метод запроса, учитывать выбор сортировки, добавить кнопки удаления и редактирования. Нужен календарь?
  }
  onPaginatorChanged(e: PageEvent): void {
    this.disabled = true
    this.pageSize = e.pageSize
    this.startItem = e.pageIndex * e.pageSize +1
    this.subscriptions.push(this.http.getOrdersData(this.pageSize, this.startItem).subscribe(data => {
      let paginatorLenght = Math.ceil(data[0].quantityOfOrders)
      this.paginatorData = {
        length: paginatorLenght,
        pageSize: this.pageSize
      }
      this.ordersArray = data
      this.disabled = false
    }))
  }
}
