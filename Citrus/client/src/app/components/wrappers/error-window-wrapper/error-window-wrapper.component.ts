import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { ServerErrorHandleService } from './../../../services/server-error-handle.service';
import { DialogWindowComponent } from './../../../shared/dialog-window/dialog-window.component';
import { AdHostDirective } from '../../../directives/ad-host';
import { Component, Input, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error-window-wrapper',
  templateUrl: './error-window-wrapper.component.html',
  styleUrls: ['./error-window-wrapper.component.scss']
})
export class ErrorWindowWrapperComponent implements OnInit, OnDestroy {
  @Input() buttonLabel: string = '';
  @Input() customMessage: string = '';
  @Input() imgLink: string = '';
  private errorStatus: number = 0;
  private errorStatusText: string = '';
  private subscriptions: Subscription[] = [];
  component = DialogWindowComponent
  @ViewChild(AdHostDirective, { static: true }) adHost!: AdHostDirective;
  constructor(
    private serverErrorHandle: ServerErrorHandleService,
    private storage: StorageService
  ) { 
    this.errorStatus = this.serverErrorHandle.getErrorInstance().status;
    this.errorStatusText = this.serverErrorHandle.getErrorInstance().statusText;
  }

  ngOnInit(): void {
    this.loadModalWindow();
  };
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    })
  }

  loadModalWindow(): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<DialogWindowComponent>(this.component);
    componentRef.instance.data = {
      windowHeaderText: `Ошибка ${this.errorStatus}!`,
      windowText: this.errorStatusText,
      buttonLabel: this.buttonLabel,
      customMessage: this.customMessage,
      imgLink: this.imgLink
    }
    this.subscriptions.push(componentRef.instance.destroyWindow.subscribe(data => {
      this.destroyWindow();
    }));
  }
  destroyWindow():void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.remove();
    this.storage.setIsResponseError(false);
  }
}
