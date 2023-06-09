import { SimpleChanges } from '@angular/core';

export function getMockSimpleChanges(value: any): SimpleChanges {
	let obj: SimpleChanges = {};
	obj[`${Object.keys(value)[0]}`] = {
		currentValue: value[Object.keys(value)[0]],
		previousValue: undefined,
		isFirstChange(): boolean {
			return true;
		},
		firstChange: true,
	};
	return obj;
}
