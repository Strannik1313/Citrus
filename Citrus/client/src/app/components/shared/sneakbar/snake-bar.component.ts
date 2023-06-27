import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-sneakbar',
	templateUrl: './snake-bar.component.html',
	styleUrls: ['./snake-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('open', [
			transition(':enter', [
				style({
					opacity: 0,
					top: '100px',
				}),
				animate('0.5s'),
				style({
					opacity: 1,
				}),
			]),
		]),
		trigger('close', [
			transition(':leave', [
				animate('0.5s'),
				style({
					opacity: 0,
				}),
			]),
		]),
	],
})
export class SnakeBarComponent {
	@Input() message = 'Ошибка соединения. Попробуйте перезагрузить страницу.';
	@Input() show: boolean | null = false;
	@Output() closeBtnClick: EventEmitter<void> = new EventEmitter<void>();

	onCloseBtnClick() {
		this.closeBtnClick.emit();
	}
}
