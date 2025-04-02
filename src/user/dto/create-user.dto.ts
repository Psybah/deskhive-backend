import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "@prisma/client"

class CreateUserDto {

    @IsString()
    @ApiProperty({
        example: 'John',
        description: 'First name of the user',
    })
    firstName: string;

    @IsString()
    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user',
    })
    lastName: string;

    @IsEmail()
    @ApiProperty({
        example: 'john@gmail.com',
        description: 'Email of the user',
    })
    email: string;
    
    @IsString()
    @ApiProperty({
        example: 'password',
        description: 'Password of the user',
    })
    password: string;
}

class CreateEmployeeDto {

    @IsString()
    @ApiProperty({
        example: 'John',
        description: 'First name of the user',
    })
    firstName: string;

    @IsString()
    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user',
    })
    lastName: string;

    @IsEmail()
    @ApiProperty({
        example: 'john@gmail.com',
        description: 'Email of the user',
    })
    email: string;

    @IsEnum(Role)
    @ApiProperty({
        enum: Role,
        example: Role.HUB_MANAGER,
        description: 'Role of the user',
    })
    role: Role
}

export {
    CreateUserDto,
    CreateEmployeeDto
};
