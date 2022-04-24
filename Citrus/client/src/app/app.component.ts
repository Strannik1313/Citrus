import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'citrus';
  constructor(
    private http: HttpService,
    private storage: StorageService
  ) { }
  ngOnInit(): void {
    const potentialToken = localStorage.getItem('authToken')
    if (potentialToken !== null) {
      this.http.setToken(potentialToken)
      this.http.me().subscribe(data => {
        this.storage.setAuthorizedUserData(data)
        
      }
    )
    }
  }
}
