import { UserDto } from '@dto/UserDto';

export interface User extends UserDto {
	password: string;
}
