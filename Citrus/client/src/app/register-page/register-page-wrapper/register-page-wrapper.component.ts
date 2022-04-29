import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page-wrapper',
  templateUrl: './register-page-wrapper.component.html',
  styleUrls: ['./register-page-wrapper.component.scss']
})
export class RegisterPageWrapperComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription
  disabledForm: boolean = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  disableForm(value: boolean): boolean {
    return this.disabledForm = value
  }

  formValue(e: any): void {
    this.disableForm(true)
    this.subscription = this.http.register(e).subscribe(
      {
        next: () => {
          this.router.navigate(['/login'])
        },
        error: (error) => {
          this.disableForm(false)
          this._snackBar.open(error.error.message, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        }
      })
  }



}
