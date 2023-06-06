import { Directive, HostListener, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarDatesDto } from '@models/CalendarDatesDto';

@Directive({
	selector: '[appAddClass]',
})
export class AddClassDirective implements OnChanges {
	@Input() day: CalendarDatesDto | undefined;
	private disabled = true;

	constructor(public element: ElementRef, private renderer: Renderer2) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.day?.currentValue) {
			this.disabled = changes.day?.currentValue.mastersId.length === 0;
			this.disabled
				? this.renderer.addClass(this.element.nativeElement, 'disable')
				: this.renderer.removeClass(this.element.nativeElement, 'disable');
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
}
