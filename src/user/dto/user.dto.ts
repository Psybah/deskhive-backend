import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

class VerifyUserDto {

    @IsEmail()
    @ApiProperty({
      example: 'john@gmail.com',
      description: 'Email of the user',
    })
    email: string;

    @IsBoolean()
    @ApiProperty({
      example: true,
      description: 'Verification status of the user',
    })
    isVerified: boolean;
}

export {
  VerifyUserDto
}