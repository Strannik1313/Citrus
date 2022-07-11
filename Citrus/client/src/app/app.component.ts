import { DialogWindowData } from './interfaces/dialog-window-data';
import { ServerErrorHandleService } from './services/server-error-handle.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'citrus';
  private subscription: Subscription[] = [];
  public dialogTextData: DialogWindowData = {
    windowHeaderText: '',
    windowText: ''
  };
  public isActive: boolean = false;
  constructor(
    private http: HttpService,
    public storage: StorageService,
    private serverErrorHandle: ServerErrorHandleService
  ) {
    this.subscription.push(this.storage.isDialogWindowOpen$.subscribe(data => {
      this.isActive = data;
      if (this.isActive) {
        this.dialogTextData = {
          windowHeaderText: this.serverErrorHandle.getErrorInstance().status.toString(),
          windowText: this.serverErrorHandle.getErrorInstance().statusText
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
  onButtonClick(e: Event) {
    this.storage.setIsDialogWindowOpen(false)
  }
}
