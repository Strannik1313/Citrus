import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	Renderer2,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appDisableDate]',
})
export class DisableDateDirective implements OnChanges {
	@Input() disable: boolean = false;
	constructor(private renderer: Renderer2, private element: ElementRef) {}
	ngOnChanges(changes: SimpleChanges): void {
		changes.disable?.currentValue
			? this.renderer.addClass(this.element.nativeElement, 'disable')
			: this.renderer.removeClass(this.element.nativeElement, 'disable');
	}
}
