export class WizardHelper {
	static updatePhoneNumber(phone: string): string {
		const regex = /([0-9]{1,2})?([0-9]{1,3})?([0-9]{1,2})?([0-9]{1,2})?/;
		let justNumbers;
		let mask;
		if (phone[0] === '+') {
			justNumbers = phone
				.match(/\d{1,}/g)
				?.slice(1)
				.join('');
		} else {
			justNumbers = phone;
		}
		justNumbers = justNumbers ?? '';
		switch (justNumbers.length) {
			case 1:
				mask = '+375($1';
				break;
			case 2:
				mask = '+375($1)';
				break;
			case 3:
				mask = '+375($1)$2';
				break;
			case 4:
				mask = '+375($1)$2';
				break;
			case 5:
				mask = '+375($1)$2';
				break;
			case 6:
				mask = '+375($1)$2-$3';
				break;
			case 7:
				mask = '+375($1)$2-$3';
				break;
			case 8:
				mask = '+375($1)$2-$3-$4';
				break;
			case 9:
				mask = '+375($1)$2-$3-$4';
				break;
			case 0:
				return justNumbers;
			default:
				mask = '+375($1)$2-$3-$4';
				break;
		}
		return justNumbers.replace(regex, mask);
	}
}
