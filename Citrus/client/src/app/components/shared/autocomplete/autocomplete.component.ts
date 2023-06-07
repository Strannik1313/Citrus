import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

export interface AutocompleteOptionType {
	title: string;
	id: number;
}

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnChanges {
	@Input() options: Array<AutocompleteOptionType> = [];
	/* eslint-disable @typescript-eslint/no-explicit-any */
	@Output() optionSelected: EventEmitter<any> = new EventEmitter();
	/* eslint-enable @typescript-eslint/no-explicit-any */
	public inputValue = '';
	public isAutocompleteOpen = false;
	public optionsList: AutocompleteOptionType[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		this.optionsList = changes.options?.currentValue;
	}

	onInputChange(): void {
		this.isAutocompleteOpen = true;
		if (this.inputValue.length === 0) {
			this.optionsList = this.options;
			this.optionSelected.emit(null);
		} else {
			this.optionsList = this.options.filter(option => {
				return option.title.includes(this.inputValue);
			});
		}
	}

	onAutocomleteItemClick(value: AutocompleteOptionType): void {
		this.inputValue = value.title;
		this.optionSelected.emit(value);
	}

	onDocClick(value: boolean): void {
		this.isAutocompleteOpen = value;
	}

	trackByFn(index: number, item: AutocompleteOptionType): number {
		return item.id;
	}
}
