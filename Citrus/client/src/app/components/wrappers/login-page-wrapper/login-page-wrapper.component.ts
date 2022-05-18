import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page-wrapper',
  templateUrl: './login-page-wrapper.component.html',
  styleUrls: ['./login-page-wrapper.component.scss']
})
export class LoginPageWrapperComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []
  disabledForm: boolean = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())

  }

  disableForm(value: boolean): boolean {
    return this.disabledForm = value
  }

  formValue(e: any): void {
    this.disableForm(true)
    this.subscriptions.push(this.http.login(e).subscribe(
      {
        next: (data) => {
          if (data.payload.admin) {
            this.router.navigate(['/'])
          } else {
            this.router.navigate(['/'])
          }
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
