// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { StorageService } from '@services/storage.service';
// import { AuthHttpService } from './auth-http.service';

// @Injectable({
// 	providedIn: 'root',
// })
// export class NavigateService {
// 	private currentUrl: Array<string> = [];

// 	constructor(
// 		private storage: StorageService,
// 		private route: Router,
// 		private authHttp: AuthHttpService,
// 	) {}

// 	goToNextPage(url: string): void {
// 		switch (url) {
// 			case '/home': {
// 				this.storage.setAccessMap('/');
// 				this.route.navigate(['/']);
// 				this.storage.setIsDialogWindowOpen(false);
// 				this.storage.resetClient();
// 				break;
// 			}
// 			case '/logout': {
// 				this.storage.setAccessMap('/');
// 				this.route.navigate(['/']);
// 				this.authHttp.logout();
// 				break;
// 			}
// 			default:
// 				{
// 					this.storage.setAccessMap(url);
// 					this.route.navigate([url]);
// 				}
// 				break;
// 		}
// 	}
// }
