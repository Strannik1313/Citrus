import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { Service } from '@interfaces/service';
import { filter, fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
	@Input() options: Array<Service> = [];
	@Output() selectedOption: EventEmitter<Service | null> = new EventEmitter();
	public inputValue: string = '';
	public isAutocompleteOpen: boolean = false;
	public isMouseOverAutocomplete: boolean = false;
	public optionsList: Service[] = [];
	private subscription: Subscription = new Subscription();

	constructor(private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription.add(
			fromEvent(document, 'click')
				.pipe(
					filter(
						event => !this.isMouseOverAutocomplete || this.isAutocompleteOpen,
					),
				)
				.subscribe(() => {
					this.isAutocompleteOpen = false;
					this.cdr.markForCheck();
				}),
		);
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.optionsList = changes.options?.currentValue;
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
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
	trackByFn(index: number, item: Service): number {
		return item.id;
	}
}
