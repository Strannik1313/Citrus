import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ServiceDto } from '@models/ServiceDto';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
	@Input() services: Array<ServiceDto> | null = [];
	@Input() selectedService: ServiceDto | null = null;
	@Output() serviceClick: EventEmitter<ServiceDto> = new EventEmitter();

	onServiceClick(service: ServiceDto | undefined): void {
		if (!service) {
			return;
		}

		this.serviceClick.emit(service);
	}

	trackByFn(index: number, item: ServiceDto): number {
		return item.id;
	}
}
