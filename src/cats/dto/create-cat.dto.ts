import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsString()
  color: string;

  @IsNumber()
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isAdopted: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
