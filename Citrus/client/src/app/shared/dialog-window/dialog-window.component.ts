import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  @Output() destroyWindow: EventEmitter<any> = new EventEmitter
  data: any
  constructor() { }

  ngOnInit(): void {
  }
  onCloseButtonClick(): void {
    this.destroyWindow.emit()
  }
}
