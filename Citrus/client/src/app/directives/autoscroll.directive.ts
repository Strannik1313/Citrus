import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appAutoscroll]',
})
export class AutoscrollDirective implements AfterViewInit {
	@Input() selectedElement: number | null = null;
	constructor(private element: ElementRef) {}
	ngAfterViewInit(): void {
		if (this.selectedElement?.toString() === this.element.nativeElement.id) {
			this.element.nativeElement?.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth',
			});
		}
	}
}
