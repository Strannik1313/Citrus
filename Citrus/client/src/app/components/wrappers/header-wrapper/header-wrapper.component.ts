import { Subscription } from 'rxjs';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
} from '@angular/core';
import { ButtonConf } from '@shared/app-button-group/app-button-group.component';
import { StorageService } from '@services/storage.service';
import { btnConfMap } from '@models/header-button-conf';
import { UserModel } from '@models/user-model';

@Component({
	selector: 'app-header-wrapper',
	templateUrl: './header-wrapper.component.html',
	styleUrls: ['./header-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderWrapperComponent implements OnDestroy {
	private subscriptions: Subscription[] = [];
	public buttonConf: Array<ButtonConf> = [];
	public userModel: UserModel = UserModel.Unauth;
	constructor(private storage: StorageService, private cdr: ChangeDetectorRef) {
		this.subscriptions.push(
			this.storage?.currentUserModel$.subscribe(data => {
				this.userModel = data;
				this.buttonConf = btnConfMap.getBtnConfByUser(this.userModel);
				this.cdr.markForCheck();
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
}
