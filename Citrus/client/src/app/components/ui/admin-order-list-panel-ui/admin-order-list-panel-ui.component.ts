import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { OrderData } from 'src/app/models/order-data';
import { PaginatorData } from 'src/app/models/paginator-data';

@Component({
  selector: 'app-admin-order-list-panel-ui',
  templateUrl: './admin-order-list-panel-ui.component.html',
  styleUrls: ['./admin-order-list-panel-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrderListPanelUiComponent implements OnInit, OnChanges {

  @Input() ordersArray: Array<OrderData> = []
  @Input() disabled: boolean = false
  @Input() paginatorData: PaginatorData = new PaginatorData
  @Output() onPaginatorClick: EventEmitter<PageEvent> = new EventEmitter
  @Output() onSortTypeChoise: EventEmitter<string> = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (let props in changes) {
      switch (props) {
        case 'ordersArray':
          
        break;
        case 'disabled':
          console.log(changes['disabled'])
        break;
      
        default:
          break;
      }
    }
  }
  onPaginatorChanged(e: PageEvent): void {
    this.onPaginatorClick.emit(e)
  }
  onSelectionChange(e: MatSelectChange): void {
    this.onSortTypeChoise.emit(e.value)
  }

}
