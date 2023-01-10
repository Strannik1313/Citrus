import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstLetterUppercase' })
export class MockFirstLetterUppercasePipe implements PipeTransform {
	transform(value: number): number {
		//Do stuff here, if you want
		return value;
	}
}
