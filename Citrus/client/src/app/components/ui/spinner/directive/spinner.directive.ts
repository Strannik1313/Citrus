import {
	ChangeDetectorRef,
	ComponentRef,
	Directive,
	ElementRef,
	Input,
	OnChanges,
	SimpleChanges,
	ViewContainerRef,
	ViewRef,
} from '@angular/core';
import { SpinnerComponent } from '@components/ui/spinner/component/spinner.component';

@Directive({
	selector: '[appSpinner]',
})
export class SpinnerDirective implements OnChanges {
	@Input() isRunning: boolean | null | undefined = false;
	spinner: ComponentRef<SpinnerComponent> | undefined;
	children: ViewRef | null | undefined;

	constructor(private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['isRunning']?.currentValue === true) {
			this.renderSpinnerInHost();
			return;
		}
		if (changes['isRunning']?.currentValue === false) {
			this.removeSpinnerFromHost();
			return;
		}
	}

	renderSpinnerInHost() {
		this.children = this.viewContainerRef.detach();
		this.spinner = this.viewContainerRef.createComponent(SpinnerComponent);
		this.spinner.instance.diameter = this.calculateSpinnerSize(this.viewContainerRef.element);
		this.cdr.markForCheck();
	}

	removeSpinnerFromHost() {
		if (!!this.spinner) {
			this.spinner.destroy();
			if (!!this.children) {
				this.viewContainerRef.insert(this.children);
			}
			this.cdr.markForCheck();
		}
	}

	calculateSpinnerSize(host: ElementRef): number {
		let height = host.nativeElement.offsetHeight;
		if (height === 0) return 100;
		if (height < 20) return 30;
		return height;
	}
}
