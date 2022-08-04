import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
	OnDestroy,
} from '@angular/core';
import { Service } from '@models/service';
import { filter, fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-search-string',
	templateUrl: './search-string.component.html',
	styleUrls: ['./search-string.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStringComponent implements OnInit, OnChanges, OnDestroy {
	@Input() options: Service[] = [];
	@Output() searchStringChange: EventEmitter<string> = new EventEmitter();
	public inputValue: string = '';
	public isAutocompleteOpen: boolean = false;
	public isMouseOverAutocomplete: boolean = false;
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
		if (changes.options?.currentValue.length < 0 || !this.inputValue) {
			this.isAutocompleteOpen = false;
		}
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	onInputChange(): void {
		this.isAutocompleteOpen = true;
		this.searchStringChange.emit(this.inputValue);
	}
	onAutocomleteItemClick(value: string): void {
		this.isAutocompleteOpen = false;
		this.inputValue = value;
		this.searchStringChange.emit(value);
	}
	trackByFn(index: number, item: Service): number {
		return item.id;
	}
}
