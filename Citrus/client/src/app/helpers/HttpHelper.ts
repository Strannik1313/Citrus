export class HttpHelper {
	static normalizeParams(params: { [key: string]: any }) {
		let temp: { [key: string]: string | number | boolean | readonly (string | number | boolean)[] } = {};
		for (const paramsKey in params) {
			const value = params[paramsKey];
			if (Array.isArray(value)) {
				if (value.length > 1) {
					temp[paramsKey] = value.join(',');
					continue;
				}
				temp[paramsKey] = value;
				continue;
			}
			switch (typeof value) {
				case 'boolean': {
					temp[paramsKey] = value;
					break;
				}
				case 'number': {
					temp[paramsKey] = value;
					break;
				}
				case 'string': {
					temp[paramsKey] = value;
					break;
				}
				default:
					break;
			}
		}
		return temp;
	}
}
