import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appAutoscroll]',
})
export class AutoscrollDirective implements AfterViewInit {
	@Input() selectedElement: number = -1;
	constructor(
		private element: ElementRef,
		private scroller: ViewportScroller,
	) {}
	ngAfterViewInit(): void {
		if (this.selectedElement.toString() === this.element.nativeElement.id) {
			this.element.nativeElement?.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			});
		}
	}
}
