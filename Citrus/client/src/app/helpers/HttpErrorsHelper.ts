import { HttpErrorResponse } from '@angular/common/http';
import { REGISTER_ERRORS } from '@enums/RegisterErrors';
import { setBadEmailOnRegister } from '@state-management/auth-feature/auth.actions';
import { showSnakeBar } from '@state-management/main-feature/main.actions';

export class HttpErrorsHelper {
	static getActionAfterRegisterError(error: HttpErrorResponse) {
		switch (error.status) {
			case REGISTER_ERRORS.EMAIL_CONFLICT: {
				return setBadEmailOnRegister({ payload: true });
			}
			default:
				return showSnakeBar();
		}
	}
}
