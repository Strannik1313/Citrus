import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-custom-button',
	templateUrl: './app-button.component.html',
	styleUrls: ['./app-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
	@Input() label = '';
	@Input() url = '';
	@Output() goToNextPage = new EventEmitter();
	onButtonClick(url: string): void {
		this.goToNextPage.emit(url);
	}
}
