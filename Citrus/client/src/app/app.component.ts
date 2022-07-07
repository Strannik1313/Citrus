import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subscription } from 'rxjs';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'citrus';
  subscription: Subscription[] = [];
  constructor(
    private http: HttpService,
    public storage: StorageService
  ) { };

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
}
