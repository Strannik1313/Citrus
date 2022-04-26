import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubmitData } from './confirm-layout/confirm-layout.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';
import { ClientData } from 'src/app/models/client-data';

@Component({
  selector: 'app-confirm-page-wrapper',
  templateUrl: './confirm-page-wrapper.component.html',
  styleUrls: ['./confirm-page-wrapper.component.scss']
})
export class ConfirmPageWrapperComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  verticalPosition: MatSnackBarVerticalPosition = 'top'
  haveAccountData: boolean = false
  authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  clientData: ClientData = new ClientData
  constructor(
    private storage: StorageService,
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router
  ) {
    this.subscriptions.push(this.storage.clientData$.subscribe(data => this.clientData = data))
    this.subscriptions.push(this.storage.authorizedUserData$.subscribe(data => {
      this.authorizedClientData = data
    }))
    this.subscriptions.push(this.storage.haveAccountData$.subscribe(data => {
      this.haveAccountData = data
    }))
    this.subscriptions.push(this.storage.haveAccountData$.subscribe(data => {
      this.haveAccountData = data
    }))
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
  formValue(e: SubmitData) {
    this.storage.setClientData({
      name: 'confirm',
      clientName: e.clientName,
      clientSurname: e.clientLastname,
      phoneNumber: e.phoneNumber,
      comment: e.comments
    })
    this.subscriptions.push(this.http.makeOrder(this.clientData).subscribe(
      {
        next: (data) => {
          if (data.message == true) {
            this._snackBar.open('Запись успешно оформлена', 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
          this.router.navigate(['/'])
          }
        },
        error: (error) => {
          this._snackBar.open(error.error.message, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      }
    ))
  }
}
