import { Controller, Get, Post, Delete, UseGuards, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';
import { Favorite } from './entities/favourite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite> {
    return this.favoritesService.createFavorite(
      createFavoriteDto.userId,
      createFavoriteDto.catId,
    );
  }

  @Get()
  @UseGuards(AuthGuard())
  async getFavorites(@Query('userId') userId: number): Promise<Favorite[]> {
    return this.favoritesService.getFavorites(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteFavorite(@Param() deleteFavoriteDto: DeleteFavoriteDto): Promise<void> {
    return this.favoritesService.deleteFavorite(deleteFavoriteDto.id);
  }
}
