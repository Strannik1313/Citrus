import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'firstLetterUppercase',
})
export class FirstLetterUppercasePipe implements PipeTransform {
	transform(value: string | undefined, ...args: unknown[]): unknown {
		if (!!value) {
			return `${value[0].toUpperCase()}${value.slice(1)}`;
		}
		return '';
	}
}
