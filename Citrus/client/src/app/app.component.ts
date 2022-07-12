import { DialogWindowData } from './interfaces/dialog-window-data';
import { ServerErrorHandleService } from './services/server-error-handle.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';
import { DialogType } from './shared/dialog-window/dialog-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  public dialogTextData: DialogWindowData = {
    windowHeaderText: '',
    windowText: ''
  };
  public isActive: boolean = false;
  public dialogType: DialogType = DialogType.Error;
  constructor(
    private http: HttpService,
    public storage: StorageService,
    private serverErrorHandle: ServerErrorHandleService
  ) {
    this.subscription.push(this.storage.isDialogWindowOpen$.subscribe(data => {
      this.isActive = data;
      if (this.isActive) {
        const error = this.serverErrorHandle?.getErrorInstance();
        this.dialogTextData = {
          windowHeaderText: error.status.toString(),
          windowText: error.statusText
        }
      }
    }))
   };

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('authToken');
    if (potentialToken !== null) {
      this.http.setToken(potentialToken);
      this.subscription.push(this.http.me().subscribe(data => {
        if (data) {
          this.storage.setAuthorizedUserData(data);
        };
      }
    ));
    };
  };

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe())
  };
  onButtonClick(e: boolean) {
    this.storage.setIsDialogWindowOpen(false);
  }
}
