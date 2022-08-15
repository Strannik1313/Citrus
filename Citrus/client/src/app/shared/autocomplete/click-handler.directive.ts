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
	@Input() isOpen = false;
	@Output() autocompleteToogle: EventEmitter<boolean> = new EventEmitter();
	private subscription: Subscription = new Subscription();
	ngOnInit(): void {
		this.subscription.add(
			fromEvent<MouseEvent>(document, 'click').subscribe(data => {
				this.autocompleteToogle.emit(false);
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
