import { DialogWindowData } from './../../interfaces/dialog-window-data';
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

enum WindowType {
  Error = 'error',
  Warning = 'warning',
  Confirm = 'confirm'
}

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogWindowComponent implements OnInit {
  @Input() type: string = '';
  @Input() textData: DialogWindowData =  {
    windowHeaderText: '',
    windowText: '',
    buttonLabel: '',
    customMessage: ''
  }
  @Output() destroyWindow: EventEmitter<any> = new EventEmitter
  constructor(
  ) { }

  ngOnInit(): void {
    switch (this.type) {
      case WindowType.Error:
        this.textData = {
          ...this.textData,
          windowHeaderText: `Ошибка ${this.textData.windowHeaderText}!`,
          windowText: this.textData.windowText,
          buttonLabel: 'Понятно',
          customMessage: 'Попробуйте перезагрузить страницу или зайдите позже',
          dialogWindowImgClass: 'error__window'
        }
        break;
      case WindowType.Warning:
        this.textData = {
          ...this.textData,
          windowHeaderText: this.textData.windowHeaderText,
          windowText: this.textData.windowText,
          buttonLabel: 'Ok',
          customMessage: 'Просто информация',
          dialogWindowImgClass: 'warning__window'
        }
        break;
      case WindowType.Confirm:
        this.textData = {
          ...this.textData,
          windowHeaderText: this.textData.windowHeaderText,
          windowText: this.textData.windowText,
          buttonLabel: 'Ok',
          customMessage: 'Вы уверены, что хотите это сделать?',
          dialogWindowImgClass: 'confirm__window'
        }
        break;
      default:
        this.textData = {
          ...this.textData,
          windowHeaderText: 'Что-то пошло не так',
          windowText: '',
          buttonLabel: 'Ok',
          customMessage: '',
          dialogWindowImgClass: 'error__window'
        }
        break;
    }
  }
  
  onCloseButtonClick(): void {
    this.destroyWindow.emit()
  }
}
