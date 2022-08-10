import {
	Directive,
	HostListener,
	ElementRef,
	Input,
	Renderer2,
	OnChanges,
	SimpleChanges,
	OnInit,
	EventEmitter,
	Output,
} from '@angular/core';
import dayjs from 'dayjs';
import { filter, fromEvent } from 'rxjs';

@Directive({
	selector: '[appAddClass]',
})
export class AddClassDirective implements OnInit, OnChanges {
	@Input() day: string = '';
	@Input() activeDates: Array<string> = [];
	@Output() onDateClick: EventEmitter<string> = new EventEmitter();
	private disabled: boolean = true;
	constructor(public element: ElementRef, private renderer: Renderer2) {}
	ngOnInit(): void {
		fromEvent(this.element.nativeElement, 'click')
			.pipe(
				filter(event => {
					return !this.disabled;
				}),
			)
			.subscribe(data => {
				this.onDateClick.emit(this.day);
			});
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.disabled = !changes.activeDates?.currentValue.find((value: string) => {
			return dayjs(value).isSame(dayjs(this.day), 'day');
		});
		this.disabled
			? this.renderer.addClass(this.element.nativeElement, 'disable')
			: this.renderer.removeClass(this.element.nativeElement, 'disable');
	}
	@HostListener('mouseenter') onMouseEnter() {
		if (!this.disabled) {
			this.renderer.addClass(this.element.nativeElement, 'hover');
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (!this.disabled) {
			this.renderer.removeClass(this.element.nativeElement, 'hover');
		}
	}
}
