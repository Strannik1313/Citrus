import { AutocompleteOptionType } from '@shared/autocomplete/autocomplete.component';

export interface ServiceDto extends AutocompleteOptionType {
	title: string;
	description: string;
	cost: number;
	duration: number;
	id: string;
}
