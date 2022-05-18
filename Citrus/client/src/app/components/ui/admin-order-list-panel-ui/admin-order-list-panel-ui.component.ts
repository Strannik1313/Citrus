import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { OrderData } from 'src/app/models/order-data';
import { OrderListButtonConfiguration } from 'src/app/models/order-list-button-configuration';
import { PaginatorData } from 'src/app/models/paginator-data';

@Component({
  selector: 'app-admin-order-list-panel-ui',
  templateUrl: './admin-order-list-panel-ui.component.html',
  styleUrls: ['./admin-order-list-panel-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrderListPanelUiComponent implements OnInit {

  buttonConfiguration: OrderListButtonConfiguration[] = [{
    buttonLabel: "Отменить",
    color: "warn",
    action: "cancel"
  },
  {
    buttonLabel: "Оформить",
    color: "primary",
    action: "done"
  },
  {
    buttonLabel: "Именить",
    color: "",
    action: "change"
  }
  ]
  @Input() ordersArray: Array<OrderData> = []
  @Input() disabled: boolean = false
  @Input() paginatorData: PaginatorData = new PaginatorData
  @Output() onPaginatorChanged: EventEmitter<PageEvent> = new EventEmitter
  @Output() onButtonClick: EventEmitter<{ action: string, orderId: number }> = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }
  onPaginatorClick(e: PageEvent): void {
    this.onPaginatorChanged.emit(e)
  }
  onButtonClicked(e: { action: string, orderId: number }): void {
    this.onButtonClick.emit(e)
  }

}
