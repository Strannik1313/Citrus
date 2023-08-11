import { HttpContextToken } from '@angular/common/http';

export const SUPPRESS_EVENT = new HttpContextToken(() => false);
