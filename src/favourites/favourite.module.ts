import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favourite.controller';
import { Favorite } from './entities/favourite.entity';
import { Cat } from 'src/cats/entities/cat.entity';
import { User } from 'src/user/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Cat, User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  ],

  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
