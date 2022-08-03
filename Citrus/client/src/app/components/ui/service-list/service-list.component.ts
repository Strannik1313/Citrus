import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	AfterViewChecked,
} from '@angular/core';
import { Service } from '@models/service';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements AfterViewChecked {
	@Input() services: Array<Service> = [];
	@Input() choisenService: number = -1;
	@Output() serviceClick: EventEmitter<Service> = new EventEmitter();
	ngAfterViewChecked(): void {
		if (this.choisenService !== -1) {
			const el = document.getElementById(this.choisenService.toString());
			el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
	}
	onServiceClick(service: Service | undefined): void {
		this.serviceClick?.emit(service);
	}
	trackByFn(index: number, item: Service): string {
		return item?.title;
	}
}
