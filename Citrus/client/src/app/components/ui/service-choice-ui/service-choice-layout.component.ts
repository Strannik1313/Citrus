import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MasterData } from '@interfaces/master-data';

@Component({
	selector: 'app-service-choice-layout',
	templateUrl: './service-choice-layout.component.html',
	styleUrls: ['./service-choice-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceChoiceLayoutComponent {
	@Input() masterData: MasterData[] = [];
	@Input() services: Array<string> = [];
	@Input() preSelection: string = '';
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

	selectIsTouched(e: MatSelectChange): void {
		this.selectionChange.emit(e);
	}

	trackByFn(index: number, item: string): string {
		return item;
	}
}
