import { BehaviorSubject, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
	public default: ButtonConf[] = btnConfMap.auth;
	public userModel: UserModel = UserModel.UNAUTH;
	public homeLink: string = NAVIGATE_ROUTES.home;
	private buttonConf: BehaviorSubject<ButtonConf[]> = new BehaviorSubject<ButtonConf[]>([]);
	private subscription: Subscription = new Subscription();
	constructor(private storage: StorageService) {}

	buttonConf$ = this.buttonConf.asObservable();
	ngOnInit(): void {
		this.subscription.add(
			this.storage.currentUserModel$.subscribe(data => {
				this.userModel = data;
				this.buttonConf.next(btnConfMap[data]);
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
