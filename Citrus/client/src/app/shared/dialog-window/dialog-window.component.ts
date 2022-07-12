import { DialogWindowData } from './../../interfaces/dialog-window-data';
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

export enum DialogType {
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
  @Input() textData: DialogWindowData = {
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
      case DialogType.Error:
        this.textData = {
          ...this.textData,
          windowHeaderText: `Ошибка ${this.textData.windowHeaderText}!`,
          windowText: this.textData.windowText,
          buttonLabel: this.textData.buttonLabel? this.textData.buttonLabel: 'Понятно',
          customMessage: this.textData.customMessage? this.textData.customMessage: 'Попробуйте перезагрузить страницу или зайдите позже',
          dialogWindowImgClass: 'error__window'
        }
        break;
      case DialogType.Warning:
        this.textData = {
          ...this.textData,
          windowHeaderText: this.textData.windowHeaderText,
          windowText: this.textData.windowText,
          buttonLabel: this.textData.buttonLabel? this.textData.buttonLabel: 'Ok',
          customMessage: this.textData.customMessage? this.textData.customMessage: 'Что-то пошло не так',
          dialogWindowImgClass: 'warning__window'
        }
        break;
      case DialogType.Confirm:
        this.textData = {
          ...this.textData,
          windowHeaderText: this.textData.windowHeaderText,
          windowText: this.textData.windowText,
          buttonLabel: this.textData.buttonLabel? this.textData.buttonLabel: 'Ok',
          customMessage: this.textData.customMessage? this.textData.customMessage: 'Вы уверены, что хотите это сделать?',
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
