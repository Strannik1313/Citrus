import { Pipe, PipeTransform } from '@angular/core';
import { Dayjs } from 'dayjs';

@Pipe({
	name: 'dayjs',
})
export class DayjsStringPipe implements PipeTransform {
	transform(value: Dayjs, ...args: unknown[]): string {
		return value.toString();
	}
}
