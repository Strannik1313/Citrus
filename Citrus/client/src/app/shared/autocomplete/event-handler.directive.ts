import {
	Directive,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[appClickHandler]',
})
export class ClickHandlerDirective implements OnInit, OnDestroy {
	@Input() isOpen: boolean = false;
	@Output() autocompleteToogle: EventEmitter<boolean> = new EventEmitter();
	private subscription: Subscription = new Subscription();
	ngOnInit(): void {
		const mouseEvent$ = fromEvent<MouseEvent>(document, 'click');
		this.subscription.add(
			mouseEvent$.subscribe(data => {
				this.autocompleteToogle.emit(false);
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
