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
import { Subject, Subscription } from 'rxjs';

const enum SearchStatus {
	Blur = 'blur',
	MouseEnter = 'mouseEnter',
}

@Component({
	selector: 'app-search-string',
	templateUrl: './search-string.component.html',
	styleUrls: ['./search-string.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStringComponent implements OnInit, OnChanges, OnDestroy {
	@Input() options: Service[] = [];
	@Output() valueForFilter: EventEmitter<string> = new EventEmitter();
	public inputValue: string = '';
	public searchStatusBlur: SearchStatus = SearchStatus.Blur;
	public searchStatusMouseEnter: SearchStatus = SearchStatus.MouseEnter;
	public searchSubject: Subject<string> = new Subject();
	public isAutocompleteOpen: boolean = false;
	private subscriptions: Subscription[] = [];
	private currentSearchStatus: string = SearchStatus.Blur;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.searchSubject.asObservable().subscribe(data => {
				switch (data) {
					case SearchStatus.Blur:
						this.isAutocompleteOpen = false;
						break;
					case SearchStatus.MouseEnter:
						this.currentSearchStatus = SearchStatus.MouseEnter;
						this.currentSearchStatus === SearchStatus.Blur
							? (this.isAutocompleteOpen = true)
							: null;
						break;
					default:
						break;
				}
				this.cdr.detectChanges();
			}),
		);
	}
	ngOnChanges(changes: SimpleChanges): void {
		changes[`${this.options}`]?.currentValue?.length === 0 || !this.inputValue
			? (this.isAutocompleteOpen = false)
			: null;
		this.cdr.detectChanges();
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
	onInputChange(): void {
		this.isAutocompleteOpen = true;
		this.cdr.detectChanges();
		this.valueForFilter.emit(this.inputValue);
	}
	onAutocomleteItemClick(value: string): void {
		this.valueForFilter.emit(value);
	}
	trackByFn(index: number, item: Service): string {
		return item.title;
	}
}
