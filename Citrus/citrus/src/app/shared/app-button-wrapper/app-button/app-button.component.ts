import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppButtonComponent implements OnInit {

  @Input() label: string = ''
  @Input() url: string = ''
  @Input() isDisabled: boolean = false
  @Output() goToNextPage = new EventEmitter ()

  constructor() { }

  onButtonClick(url: string): void {
    this.goToNextPage.emit(url)
  }

  ngOnInit(): void {
  }

  

  // buttonStatus(label: string): boolean {
  //   if (label == 'Back') {
  //     this.storage.setButtonStatus()
  //     return this.isDisabled
  //   }
  //   return false
  // }


}
