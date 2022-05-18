import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorizedClientData } from 'src/app/models/authorized-client-data';
import { ClientData } from 'src/app/models/client-data';
import { SubmitData } from 'src/app/interfaces/confirm-page-submit-data';

@Component({
  selector: 'app-confirm-page-wrapper',
  templateUrl: './confirm-page-wrapper.component.html',
  styleUrls: ['./confirm-page-wrapper.component.scss']
})

export class ConfirmPageWrapperComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  public haveAccountData: boolean = false;
  public isAdmin: boolean = false;
  public authorizedClientData: AuthorizedClientData = new AuthorizedClientData;
  public clientData: ClientData = new ClientData;

  constructor(
    private storage: StorageService,
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router
  ) {
    this.subscriptions.push(this.storage?.clientData$?.subscribe(data => this.clientData = data));
    this.subscriptions.push(this.storage?.authorizedUserData$?.subscribe(data => {
      this.authorizedClientData = data;
    }));
    this.subscriptions.push(this.storage?.isAdmin$?.subscribe(data => {
      this.isAdmin = data;
    }));
    this.subscriptions.push(this.storage?.haveAccountData$?.subscribe(data => {
      this.haveAccountData = data;
    }));
    this.subscriptions.push(this.storage?.haveAccountData$?.subscribe(data => {
      this.haveAccountData = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  };

  onSaveFormValue(e: SubmitData): void {
    this.storage.setClientData({
      name: 'confirm',
      clientName: e.clientName,
      clientSurname: e.clientLastname,
      phoneNumber: e.phoneNumber,
      comment: e.comments
    });
    this.subscriptions.push(this.http?.makeOrder(this.clientData)?.subscribe(
      {
        next: (data) => {
          if (data.message == true) {
            this._snackBar.open('Запись успешно оформлена', 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          this.router.navigate(['/']);
          };
        },
        error: (error) => {
          this._snackBar.open(error.error.message, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    ));
  };
}
