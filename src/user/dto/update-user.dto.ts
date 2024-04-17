import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  username?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  password?: string;
}
