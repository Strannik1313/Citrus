import { UserDto } from '@models/UserDto';

export interface LoginDto {
	acceptToken: string;
	user: UserDto;
}
