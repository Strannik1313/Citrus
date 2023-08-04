import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LABELS } from '@enums/labels/Labels';
import { BUTTON_LABELS } from '@enums/labels/ButtonLabels';
import { Router } from '@angular/router';

@Component({
	selector: 'app-accept-page',
	templateUrl: './accept-page.component.html',
	styleUrls: ['./accept-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptPageComponent {
	LABELS: typeof LABELS = LABELS;
	BTN_LABELS: typeof BUTTON_LABELS = BUTTON_LABELS;

	constructor(private router: Router) {}

	onBtnClick() {
		this.router.navigate(['/']);
	}
}
