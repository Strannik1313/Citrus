import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { Service } from '@interfaces/service';

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnChanges {
	@Input() options: Array<Service> = [];
	@Output() selectedOption: EventEmitter<Service | null> = new EventEmitter();
	public inputValue: string = '';
	public isAutocompleteOpen: boolean = false;
	public optionsList: Service[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		this.optionsList = changes.options?.currentValue;
	}
	onInputChange(): void {
		this.isAutocompleteOpen = true;
		if (this.inputValue.length === 0) {
			this.optionsList = this.options;
			this.selectedOption.emit(null);
		} else {
			this.optionsList = this.options.filter(option => {
				return option.title.includes(this.inputValue);
			});
		}
	}
	onAutocomleteItemClick(value: Service): void {
		this.isAutocompleteOpen = false;
		this.inputValue = value.title;
		this.selectedOption.emit(value);
	}
	onToogle(value: boolean): void {
		this.isAutocompleteOpen = value;
	}
	trackByFn(index: number, item: Service): number {
		return item.id;
	}
}
