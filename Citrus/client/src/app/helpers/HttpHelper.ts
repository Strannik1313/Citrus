export class HttpHelper {
	static normalizeParams(params: { [key: string]: any }) {
		let temp: { [key: string]: string | number | boolean | readonly (string | number | boolean)[] } = {};
		for (const paramsKey in params) {
			if (Array.isArray(params[paramsKey])) {
				temp[paramsKey] = params[paramsKey];
				continue;
			}
			switch (typeof params[paramsKey]) {
				case 'boolean': {
					temp[paramsKey] = params[paramsKey];
					break;
				}
				case 'number': {
					temp[paramsKey] = params[paramsKey];
					break;
				}
				case 'string': {
					temp[paramsKey] = params[paramsKey];
					break;
				}
				default:
					break;
			}
		}
		return temp;
	}
}
