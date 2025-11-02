import { PartialType } from '@nestjs/swagger';
import { CreateUserRequest } from './create-user-request.dto';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}
