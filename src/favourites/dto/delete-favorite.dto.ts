import { IsNumber } from 'class-validator';

export class DeleteFavoriteDto {
  @IsNumber()
  id: number;
}
