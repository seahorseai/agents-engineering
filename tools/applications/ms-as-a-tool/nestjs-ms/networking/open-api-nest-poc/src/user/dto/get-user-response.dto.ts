import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: number;
}