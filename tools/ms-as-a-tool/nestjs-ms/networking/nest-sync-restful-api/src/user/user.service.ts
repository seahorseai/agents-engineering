import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserResponse } from './create-user-response.dto';
import { User } from './user.entity';
import { GetUserResponse } from './get-user-response.dto';

@Injectable()
export class UserService {
	users: User[] = [];

  async findOne(arg0: number): Promise<GetUserResponse> {
		const foundUser: User = await this.users.find(user => user.id === arg0);

		const getUserResponse: GetUserResponse = {
			id: foundUser.id,
			name: foundUser.name,
			email: foundUser.email,
			password: foundUser.password,
		};
		return getUserResponse;
  }

  async create(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
		const newUserId = this.users.length + 1;
		const newUser: User = {...createUserRequest, id: newUserId};
		await this.users.push(newUser);
		
		const createUserResponse: CreateUserResponse = {
			name: newUser.name,
			email: newUser.email,
			password: newUser.password
		}
		return createUserResponse;
  }
}