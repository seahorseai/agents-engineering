import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserResponse } from './create-user-response.dto';
import { GetUserResponse } from './get-user-response.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserRequest: CreateUserRequest) : Promise<CreateUserResponse> {
    return await this.userService.create(createUserRequest);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<GetUserResponse> {
    return this.userService.findOne(id);
  }
}