import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrderData } from 'src/app/models/order-data';
import { OrderListButtonConfiguration } from 'src/app/models/order-list-button-configuration';
import { PaginatorData } from 'src/app/models/paginator-data';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCardComponent {
  @Input() ordersArray: Array<OrderData> = [];
  @Input() buttonConfiguration: Array<OrderListButtonConfiguration> = [];
  @Input() disabled: boolean = false;
  @Input() paginatorData: PaginatorData = new PaginatorData;
  @Output() onPaginatorClick: EventEmitter<PageEvent> = new EventEmitter;
  @Output() onButtonClicked: EventEmitter<{action: string, orderId: number}> = new EventEmitter;

  onPaginatorChanged(e: PageEvent): void {
    this.onPaginatorClick.emit(e);
  };

  onButtonClick(e: {action: string, orderId: number}): void {
    this.onButtonClicked.emit(e);
  };
}
