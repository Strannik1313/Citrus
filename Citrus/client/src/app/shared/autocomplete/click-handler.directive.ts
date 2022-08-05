import {
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { filter, fromEvent, mergeWith, Subscription } from 'rxjs';

@Directive({
	selector: '[appClickHandler]',
})
export class ClickHandlerDirective implements OnInit, OnDestroy {
	@Input() isOpen: boolean = false;
	@Output() autocompleteToogle: EventEmitter<boolean> = new EventEmitter();
	private isMouseOver: boolean = false;
	private subscription: Subscription = new Subscription();
	constructor(private element: ElementRef) {}
	ngOnInit(): void {
		const mouseEvent$ = fromEvent<MouseEvent>(document, 'click').pipe(
			filter(event => {
				return !this.isMouseOver;
			}),
			mergeWith(
				fromEvent<MouseEvent>(this.element.nativeElement, 'mouseleave'),
				fromEvent<MouseEvent>(this.element.nativeElement, 'mouseenter'),
			),
		);
		this.subscription.add(
			mouseEvent$.subscribe(data => {
				switch (data.type) {
					case 'mouseleave':
						this.isMouseOver = false;
						break;
					case 'mouseenter':
						this.isMouseOver = true;
						break;
					case 'click':
						this.autocompleteToogle.emit(false);
						break;
					default:
						break;
				}
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
