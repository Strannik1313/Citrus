import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	Renderer2,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appAddActiveClass]',
})
export class AddActiveClassDirective implements OnChanges {
	@Input() selectedElement: number | string | null | undefined = null;
	constructor(private element: ElementRef, private renderer: Renderer2) {}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.selectedElement?.toString() === this.element.nativeElement.id) {
			this.renderer.addClass(this.element.nativeElement, 'active');
		} else if (this.element.nativeElement.classList.contains('active')) {
			this.renderer.removeClass(this.element.nativeElement, 'active');
		}
	}
}
