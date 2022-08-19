import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	Input,
} from '@angular/core';
import {
	DialogType,
	DialogWindow,
	DIALOG_WINDOW_INIT,
} from '@models/dialog-window';

@Component({
	selector: 'app-dialog-window',
	templateUrl: './dialog-window.component.html',
	styleUrls: ['./dialog-window.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWindowComponent implements OnInit {
	@Input() textData: DialogWindow = DIALOG_WINDOW_INIT;
	@Output() destroyWindow: EventEmitter<boolean> = new EventEmitter();
	ngOnInit(): void {
		switch (this.textData.type) {
			case DialogType.Error:
				this.textData = {
					...this.textData,
					windowHeaderText: this.textData.windowHeaderText ?? 'Ошибка',
					windowText: this.textData.windowText,
					buttonLabel: this.textData.buttonLabel
						? this.textData.buttonLabel
						: 'Понятно',
					customMessage: this.textData.customMessage
						? this.textData.customMessage
						: 'Попробуйте перезагрузить страницу или зайдите позже',
					imgClass: 'error__window',
				};
				break;
			case DialogType.Warning:
				this.textData = {
					...this.textData,
					windowHeaderText: this.textData.windowHeaderText,
					windowText: this.textData.windowText,
					buttonLabel: this.textData.buttonLabel ?? 'Ok',
					customMessage: this.textData.customMessage ?? 'Что-то пошло не так',
					imgClass: 'warning__window',
				};
				break;
			case DialogType.Confirm:
				this.textData = {
					...this.textData,
					windowHeaderText: this.textData.windowHeaderText,
					windowText: this.textData.windowText,
					buttonLabel: this.textData.buttonLabel ?? 'Ok',
					customMessage:
						this.textData.customMessage ??
						'Вы уверены, что хотите это сделать?',
					imgClass: 'confirm__window',
				};
				break;
			default:
				this.textData = {
					...this.textData,
					windowHeaderText: 'Что-то пошло не так',
					windowText: '',
					buttonLabel: 'Ok',
					customMessage: '',
					imgClass: 'error__window',
				};
				break;
		}
	}
	onCloseButtonClick(): void {
		this.destroyWindow.emit(true);
	}
}
