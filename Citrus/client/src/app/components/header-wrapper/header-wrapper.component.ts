import { Subscription } from 'rxjs';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { ButtonConf } from '@shared/app-button-group/app-button-group.component';
import { StorageService } from '@services/storage.service';
import { btnConfMap } from '@models/header-button-conf';
import { UserModel } from '@models/user-model';
import { NAVIGATE_ROUTES } from '@constants/navigate-routes';

@Component({
	selector: 'app-header-wrapper',
	templateUrl: './header-wrapper.component.html',
	styleUrls: ['./header-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderWrapperComponent implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	public homeLink: string = NAVIGATE_ROUTES.home;
	public buttonConf: Array<ButtonConf> = [];
	public userModel: UserModel = UserModel.Unauth;
	constructor(
		private storage: StorageService,
		private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.subscription.add(
			// BtnConfMapStateEnum
			this.storage?.currentUserModel$.subscribe((data: UserModel) => {
				this.userModel = data;
				this.buttonConf = btnConfMap.getBtnConfByUser(this.userModel);
				this.cdr.markForCheck();
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
