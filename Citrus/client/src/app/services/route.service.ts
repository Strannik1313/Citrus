import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RouteService {
	private subscription: Subscription;
	private currentUrl: Array<string> = [];

	constructor(
		private storage: StorageService,
		private route: Router,
		private http: HttpService,
	) {
		this.subscription = this.storage?.roadMapUrls$?.subscribe(
			data => (this.currentUrl = data),
		);
	}

	goToNextPage(url: string): void {
		switch (url) {
			case '/..': {
				this.goToPreviousPage(url);
				break;
			}
			case '/home': {
				this.storage?.setRoadMap('clear');
				this.storage?.setAccessMap('/');
				this.route?.navigate(['/']);
				this.storage?.setBackButtonStatus();
				this.storage?.setClientDataSaved(false);
				this.storage?.setIsDialogWindowOpen(false);
				this.storage?.setClientData({
					name: 'home',
					master: '',
					masterId: 0,
					masterWasSelected: false,
					service: '',
					date: null,
					time: {
						hour: 0,
						minute: 0,
					},
				});
				break;
			}
			case '/logout': {
				this.storage?.setRoadMap('clear');
				this.storage?.setAccessMap('/');
				this.route?.navigate(['/']);
				this.storage?.setBackButtonStatus();
				this.http.logout();
				break;
			}
			default:
				{
					this.storage?.setRoadMap(url);
					this.storage?.setAccessMap(url);
					this.route?.navigate([url]);
					this.storage?.setBackButtonStatus();
					this.storage?.setClientDataSaved(true);
				}
				break;
		}
	}

	goToPreviousPage(url: string): void {
		this.storage?.setRoadMap(url);
		this.route?.navigate([this.currentUrl[this.currentUrl.length - 1]]);
		this.storage?.setBackButtonStatus();
		this.storage?.setClientDataSaved(false);
	}
}
