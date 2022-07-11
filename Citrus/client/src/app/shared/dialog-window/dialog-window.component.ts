import { DialogWindowData } from './../../interfaces/dialog-window-data';
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogWindowComponent implements OnInit, AfterViewInit {

  @Output() destroyWindow: EventEmitter<any> = new EventEmitter
  @ViewChild('img') img: ElementRef | undefined
  data: DialogWindowData = {
    windowHeaderText: '',
    windowText: '',
    buttonLabel: '',
    customMessage: '',
    windowClass: ''
  }
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.img) {
      for (let i = 0; i < this.img.nativeElement.classList.length; i++) {
        const elClass = this.img.nativeElement.classList[i];
        switch (elClass) {
          case 'error__window':
            this.renderer.setStyle(
              this.img.nativeElement,
              'content',
              'url("../../../assets/images/error.png")'
            )
            break;
          case 'warning__window':
            this.renderer.setStyle(
              this.img.nativeElement,
              'content',
              'url("../../../assets/images/warning.png")'
            )
            break;
          case 'confirm__window':
            this.renderer.setStyle(
              this.img.nativeElement,
              'content',
              'url("../../../assets/images/confirm.png")'
            )
            break;
          default:
            break;
        }
      }
    }
  }
  onCloseButtonClick(): void {
    this.destroyWindow.emit()
  }
}
