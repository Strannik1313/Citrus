import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-page-wrapper',
  templateUrl: './account-page-wrapper.component.html',
  styleUrls: ['./account-page-wrapper.component.scss']
})
export class AccountPageWrapperComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []
  haveAccountData: boolean = false
  authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  disabledForm: boolean = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  verticalPosition: MatSnackBarVerticalPosition = 'top'
  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private storage: StorageService
  ) {
    this.subscriptions.push(this.storage.authorizedUserData$.subscribe(data => {
      this.authorizedClientData = data
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

  logout(): void {
    this.http.logout()
  }

  disableForm(value: boolean): boolean {
    return this.disabledForm = value
  }

  setFormValue(e: any) {
    this.disableForm(true)
    this.subscriptions.push(this.http.personal(e).subscribe(
      {
        next: () => {

        },
        error: (error) => {
          this.disableForm(false)
          this._snackBar.open(error.error.message, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      }
    ))
  }
}
