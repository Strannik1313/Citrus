import {
	Directive,
	HostListener,
	ElementRef,
	Input,
	Renderer2,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appAddClass]',
})
export class AddClassDirective implements OnChanges {
	@Input() hoverClass: string = '';
	@Input() disabled: boolean = true;
	constructor(public element: ElementRef, private renderer: Renderer2) {}
	ngOnChanges(changes: SimpleChanges): void {
		changes.disabled?.currentValue
			? this.renderer.addClass(this.element.nativeElement, 'disable')
			: this.renderer.removeClass(this.element.nativeElement, 'disable');
	}
	@HostListener('mouseenter') onMouseEnter() {
		if (!this.disabled) {
			this.renderer.addClass(this.element.nativeElement, this.hoverClass);
		}
	}

	@HostListener('mouseleave') onMouseLeave() {
		if (!this.disabled) {
			this.renderer.removeClass(this.element.nativeElement, this.hoverClass);
		}
	}
}
