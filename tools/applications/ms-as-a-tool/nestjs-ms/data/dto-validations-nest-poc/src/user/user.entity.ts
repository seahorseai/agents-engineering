import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Match } from './match.decorator';

export class UserEntity {

	@IsNotEmpty()	
	name: string;
	
	@IsEmail()
	email: string;
	
	@MinLength(6)
	@MaxLength(50)
	password: string;

	@Match('password', {message: 'Password and confirm password do not match'})
	confirmPassword: string
	
	constructor() {
		this.password = '';
	}
}