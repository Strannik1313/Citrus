import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';

@Injectable({
	providedIn: 'root',
})
export class NavigateService {
	private currentUrl: Array<string> = [];

	constructor(
		private storage: StorageService,
		private route: Router,
		private http: HttpService,
	) {}

	goToNextPage(url: string): void {
		switch (url) {
			case '/home': {
				this.storage.setAccessMap('/');
				this.route.navigate(['/']);
				this.storage.setIsDialogWindowOpen(false);
				this.storage.resetClient();
				break;
			}
			case '/logout': {
				this.storage.setAccessMap('/');
				this.route.navigate(['/']);
				this.http.logout();
				break;
			}
			default:
				{
					this.storage.setAccessMap(url);
					this.route.navigate([url]);
				}
				break;
		}
	}
}
