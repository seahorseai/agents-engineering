import { Injectable } from '@nestjs/common';
import { UpdateUserRequest } from './dto/update-user.dto';
import { CreateUserRequest } from './dto/create-user-request.dto';

@Injectable()
export class UserService {
  create(CreateUserRequest: CreateUserRequest) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserRequest: UpdateUserRequest) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}