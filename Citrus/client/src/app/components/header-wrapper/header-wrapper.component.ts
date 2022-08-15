import { Observable, of, Subscription } from 'rxjs';
import {
	ChangeDetectionStrategy,
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
	public buttonConf$: Observable<Array<ButtonConf>> | undefined;
	public default: ButtonConf[] = btnConfMap.auth;
	public userModel: UserModel = UserModel.UNAUTH;
	public homeLink: string = NAVIGATE_ROUTES.home;
	private subscription: Subscription = new Subscription();
	constructor(private storage: StorageService) {}
	ngOnInit(): void {
		this.subscription.add(
			this.storage.currentUserModel$.subscribe(data => {
				this.userModel = data;
				this.buttonConf$ = of(btnConfMap[data]);
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
