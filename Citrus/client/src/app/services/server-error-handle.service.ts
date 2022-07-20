import { StorageService } from './storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ServerErrorHandleService {
	private errorInstance: HttpErrorResponse = new HttpErrorResponse({});
	constructor(private storage: StorageService) {}

	setErrorInstance(error: HttpErrorResponse): void {
		this.errorInstance = error;
		this.storage?.setIsDialogWindowOpen(true);
	}
	getErrorInstance(): HttpErrorResponse {
		return this.errorInstance;
	}
}
