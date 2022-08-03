import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MasterCard } from '@interfaces/free-times';

@Component({
	selector: 'app-master-card',
	templateUrl: './master-card.component.html',
	styleUrls: ['./master-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterCardComponent {
	@Input() masterCard: Array<MasterCard> = [];
	@Input() choisenMaster: number = -1;
	trackByFn(index: number, item: MasterCard | Date): number {
		return index;
	}
}
