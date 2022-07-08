import { DialogWindowData } from './../../interfaces/dialog-window-data';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogWindowComponent implements OnInit {
  
  @Output() destroyWindow: EventEmitter<any> = new EventEmitter
  data: DialogWindowData = {
    windowHeaderText: '',
    windowText: '',
    buttonLabel: '',
    customMessage: '',
    imgLink: ''
  }
  constructor() { }

  ngOnInit(): void {
  }
  onCloseButtonClick(): void {
    this.destroyWindow.emit()
  }
}
