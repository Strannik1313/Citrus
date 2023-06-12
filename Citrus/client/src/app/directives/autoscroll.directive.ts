import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appAutoscroll]',
})
export class AutoscrollDirective {
	@Input() set isSelected(condition: boolean | null | undefined) {
		if (condition && this.element) {
			this.element.nativeElement.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			});
		}
	}
	constructor(private element: ElementRef) {}
}
