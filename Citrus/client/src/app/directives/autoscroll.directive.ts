import { ViewportScroller } from '@angular/common';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appAutoscroll]',
})
export class AutoscrollDirective {
	@Input() selectedElement: number = -1;
	constructor(
		private element: ElementRef,
		private scroller: ViewportScroller,
	) {}
}
