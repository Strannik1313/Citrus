// import { Component } from '@angular/core';

// interface AdminPanelContent {
// 	createMaster: string;
// 	createService: string;
// 	orderList: string;
// 	noone: string;
// }

// interface ButtonConf {
// 	label: string;
// 	key: string;
// }

// @Component({
// 	selector: 'app-admin-page-wrapper',
// 	templateUrl: './admin-page-wrapper.component.html',
// 	styleUrls: ['./admin-page-wrapper.component.scss'],
// })
// export class AdminPageWrapperComponent {
// 	public adminPanelContent: AdminPanelContent = {
// 		createMaster: 'create-master',
// 		createService: 'create-service',
// 		orderList: 'order-list',
// 		noone: '',
// 	};
// 	public buttonsConf: Array<ButtonConf> = [
// 		{
// 			label: 'Создать нового мастера',
// 			key: this.adminPanelContent.createMaster,
// 		},
// 		{
// 			label: 'Создать новую услугу',
// 			key: this.adminPanelContent.createService,
// 		},
// 		{
// 			label: 'Забронированные места',
// 			key: this.adminPanelContent.orderList,
// 		},
// 	];
// 	public currentContent: string = this.adminPanelContent.noone;

// 	setContent(action: string): void {
// 		this.currentContent = action;
// 	}

// 	trackByFn(index: number, item: ButtonConf): string {
// 		return item.key;
// 	}
// }
