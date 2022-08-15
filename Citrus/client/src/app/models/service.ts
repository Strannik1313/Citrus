import { AutocompleteOptionType } from '@shared/autocomplete/autocomplete.component';

export interface Service extends AutocompleteOptionType {
	title: string;
	description: string;
	cost: number;
	duration: number;
	id: number;
}
