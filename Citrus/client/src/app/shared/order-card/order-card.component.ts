import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Order } from '@interfaces/order';

@Component({
	selector: 'app-order-card',
	templateUrl: './order-card.component.html',
	styleUrls: ['./order-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCardComponent {
	@Input() orderCards: Array<Order> = [];
	@Input() choisenMaster: number | null = null;
	trackByFn(index: number, item: Order | string): number {
		return index;
	}
}
