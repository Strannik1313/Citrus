import { StorageService } from './storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorHandleService {
  private isServerError: boolean = false;
  private errorInstance: HttpErrorResponse = new HttpErrorResponse({});
  constructor(
    private storage: StorageService
  ) { };

  setIsServerError(isError: boolean): void {
    this.isServerError = isError;
  };
  setErrorInstance(error: HttpErrorResponse): void {
    this.errorInstance = error;
    this.storage.setIsResponseError(this.isServerError);
  }; 
  getErrorInstance(): HttpErrorResponse {
    return this.errorInstance
  };
}
