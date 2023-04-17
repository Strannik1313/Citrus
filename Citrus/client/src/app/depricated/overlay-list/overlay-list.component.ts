import { CdkDrag, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
	Component,
	ChangeDetectionStrategy,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter,
	ChangeDetectorRef,
} from '@angular/core';

@Component({
	selector: 'app-overlay-list',
	exportAs: 'overlayList',
	templateUrl: './overlay-list.component.html',
	styleUrls: ['./overlay-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayListComponent {
	content: Array<string> = [];
	isActive = false;
	prev: CdkDrag<string> | undefined;
	next: CdkDrag<string> | undefined;
	private count = 1;
	@ViewChild('overlay', { static: false }) overlay!: CdkConnectedOverlay;
	@ViewChild('tooltip', { static: false }) tooltip!: ElementRef;
	@Output() mouseleave = new EventEmitter();
	origin!: CdkOverlayOrigin;
	positions = [
		new ConnectionPositionPair(
			{ originX: 'end', originY: 'center' },
			{ overlayX: 'end', overlayY: 'center' },
			0,
			0,
			'tooltip-body-top',
		),
	];
	visible = false;
	constructor(public cdr: ChangeDetectorRef) {}

	setOverlayOrigin(origin: CdkOverlayOrigin): void {
		this.origin = origin.elementRef.nativeElement;
		this.show();
	}

	hide(): void {
		this.visible = false;
		this.cdr.markForCheck();
	}

	show(): void {
		this.visible = true;
		this.cdr.markForCheck();
	}

	setContent(content: Array<string>): void {
		this.content = content;
	}

	enter(event: CdkDragEnter): void {
		this.next = event.container.data;
		// console.log(this.next);
		// this.content = this.content.map(item => {
		// 	let index = this.count % this.content.length;
		// 	this.count++;
		// 	return this.content[index];
		// });
	}
	exit(event: CdkDragExit): void {
		this.prev = event.item;
		// this.content = this.content.map(item => {
		// 	let index = this.count % this.content.length;
		// 	this.count++;
		// 	return this.content[index];
		// });
	}
}
