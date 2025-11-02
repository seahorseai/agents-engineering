import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) : CreateUserDto {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll(): CreateUserDto[] {
    return this.users;
  }
}
