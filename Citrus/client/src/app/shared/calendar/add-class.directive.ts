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
	AfterViewInit,
	OnDestroy,
} from '@angular/core';
import { CalendarDates } from '@models/calendar-dates';
import dayjs from 'dayjs';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[appAddClass]',
})
export class AddClassDirective
	implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
	@Input() day: CalendarDates | undefined;
	@Input() selectedDay: string | null | undefined;
	@Output() onDateClick: EventEmitter<CalendarDates> = new EventEmitter();
	private disabled = true;
	private subscription: Subscription = new Subscription();
	constructor(public element: ElementRef, private renderer: Renderer2) {}
	ngOnInit(): void {
		this.subscription.add(
			fromEvent<MouseEvent>(this.element.nativeElement, 'click')
				.pipe(
					filter(event => {
						return !this.disabled;
					}),
				)
				.subscribe(event => {
					this.onDateClick.emit(this.day);
				}),
		);
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.disabled = changes.day?.currentValue.mastersId.length === 0;
		this.disabled
			? this.renderer.addClass(this.element.nativeElement, 'disable')
			: this.renderer.removeClass(this.element.nativeElement, 'disable');
	}
	ngAfterViewInit(): void {
		if (dayjs(this.selectedDay).isSame(this.element.nativeElement.id, 'day')) {
			this.renderer.addClass(this.element.nativeElement, 'active');
		} else if (this.element.nativeElement.classList.contains('active')) {
			this.renderer.removeClass(this.element.nativeElement, 'active');
		}
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
	@HostListener('click') onMouseClick() {
		if (!this.disabled) {
			this.renderer.addClass(this.element.nativeElement, 'active');
		}
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
