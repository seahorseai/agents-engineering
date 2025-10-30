import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: number;
}