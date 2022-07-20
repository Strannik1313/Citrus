import { Component, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { ClientData } from 'src/app/models/client-data';
import { MasterData } from 'src/app/interfaces/master-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-service-choice-wrapper',
	templateUrl: './service-choice-wrapper.component.html',
	styleUrls: ['./service-choice-wrapper.component.scss'],
})
export class ServiceChoiceWrapperComponent implements OnDestroy {
	private subscriptions: Subscription[] = [];
	public shouldClientDataBeSaved: boolean = false;
	public services: string[] = [];
	public preSelectionServices: string = '';
	public masterData: MasterData[] = [];
	public clientData: ClientData = new ClientData();

	constructor(private http: HttpService, private storage: StorageService) {
		this.subscriptions.push(
			this.storage?.clientData$?.subscribe(data => (this.clientData = data)),
		);
		this.subscriptions.push(
			this.http?.getMasterData()?.subscribe(data => {
				if (this.clientData.masterWasSelected) {
					this.masterData = data.filter(m => {
						return m.id === this.clientData.masterId;
					});
				} else {
					this.masterData = data;
				}
				for (let i = 0; i < this.masterData.length; i++) {
					for (let y = 0; y < this.masterData[i].services.length; y++) {
						if (
							this.services.find(a => a === this.masterData[i].services[y]) ===
							undefined
						) {
							this.services.push(this.masterData[i].services[y]);
						}
					}
				}
				if (!!this.clientData.service) {
					this.preSelectionServices = this.clientData.service;
				}
			}),
		);
		this.subscriptions.push(
			this.storage?.shouldClientDataSaved$?.subscribe(data => {
				this.shouldClientDataBeSaved = data;
			}),
		);
	}

	ngOnDestroy(): void {
		if (!this.shouldClientDataBeSaved) {
			this.storage.setClientData({
				name: 'services',
				value: '',
			});
		}
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	updateChoisenServices(e: MatSelectChange): void {
		this.storage.setClientData({
			name: 'services',
			value: e.value,
		});
	}
}
