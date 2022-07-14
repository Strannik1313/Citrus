import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppButtonComponent {
  @Input() label: string = '';
  @Input() url: string = '';
  @Input() isDisabled: boolean | null = false;
  @Output() goToNextPage = new EventEmitter ();

  onButtonClick(url: string): void {
    this.goToNextPage.emit(url);
  };
}
