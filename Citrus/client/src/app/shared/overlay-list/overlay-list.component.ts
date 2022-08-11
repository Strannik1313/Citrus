import {
	CdkDragDrop,
	CdkDragSortEvent,
	moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
	CdkConnectedOverlay,
	CdkOverlayOrigin,
	ConnectionPositionPair,
} from '@angular/cdk/overlay';
import {
	Component,
	ChangeDetectionStrategy,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	OnInit,
} from '@angular/core';

@Component({
	selector: 'app-overlay-list',
	exportAs: 'overlayList',
	templateUrl: './overlay-list.component.html',
	styleUrls: ['./overlay-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayListComponent implements OnInit {
	content: Array<string> = [];
	isActive = false;
	listItems: Array<string> = [];
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

	ngOnInit(): void {
		this.listItems[0] = this.content[3];
		this.listItems[1] = this.content[0];
		this.listItems[2] = this.content[1];
	}

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

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.content, event.previousIndex, event.currentIndex);
	}
	sort(event: CdkDragSortEvent<string[]>): void {
		this.listItems[0] = this.content[2];
		this.listItems[1] = this.content[3];
		this.listItems[2] = this.content[0];
	}
}
