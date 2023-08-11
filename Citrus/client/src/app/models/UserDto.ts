import { UserRoles } from '@enums/UserRoles';

export interface UserDto {
	email: string;
	id: string;
	name?: string;
	surname?: string;
	phoneNumber: number;
	role: UserRoles;
}
