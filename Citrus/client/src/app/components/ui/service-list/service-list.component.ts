import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { Service } from '@models/service';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
	@Input() services: Array<Service> = [];
	@Input() choisenService: number | null = null;
	@Output() serviceClick: EventEmitter<Service> = new EventEmitter();
	onServiceClick(service: Service | undefined): void {
		this.serviceClick.emit(service);
	}
	trackByFn(index: number, item: Service): number {
		return item?.id;
	}
}
