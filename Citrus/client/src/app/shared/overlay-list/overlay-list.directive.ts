import {
	ComponentRef,
	Directive,
	ElementRef,
	Input,
	ViewContainerRef,
} from '@angular/core';
import { OverlayListComponent } from '@shared/overlay-list/overlay-list.component';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[appOverlayList]',
	exportAs: 'overlayListDirective',
})
export class OverlayListDirective {
	@Input()
	content: Array<string> = [];
	component: OverlayListComponent | undefined;
	componentRef: ComponentRef<OverlayListComponent> | undefined;
	private subscription: Subscription = new Subscription();

	constructor(
		private elementRef: ElementRef,
		private hostView: ViewContainerRef,
	) {}
	ngAfterViewInit(): void {
		this.subscription.add(
			fromEvent<MouseEvent>(document, 'click')
				.pipe(
					filter(event => {
						const clickTarget = event.target as HTMLElement;
						return (
							!!this.componentRef &&
							clickTarget !== this.elementRef.nativeElement
						);
					}),
				)
				.subscribe(event => {
					this.component!.hide();
					this.destroyTooltipRef();
				}),
		);
		this.subscription.add(
			fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click').subscribe(
				event => {
					if (this.componentRef) {
						this.component!.hide();
						this.destroyTooltipRef();
					} else {
						this.createComponent();
						this.component!.show();
					}
				},
			),
		);
	}

	createComponent(): void {
		this.componentRef = this.hostView.createComponent(OverlayListComponent);
		this.component = this.componentRef.instance as OverlayListComponent;
		this.component.setContent(this.content);
		this.component.setOverlayOrigin({ elementRef: this.elementRef });
	}

	destroyTooltipRef() {
		if (this.componentRef) {
			this.componentRef.destroy();
			this.componentRef = undefined;
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
