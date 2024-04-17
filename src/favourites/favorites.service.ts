import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favourite.entity';
import { User } from '../user/user.entity';
import { Cat } from '../cats/entities/cat.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async createFavorite(userId: number, catId: number): Promise<Favorite> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const cat = await this.catsRepository.findOne({ where: { id: catId } });
    const favorite = this.favoritesRepository.create({ user, cat });
    return this.favoritesRepository.save(favorite);
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({ where: { user: { id: userId } } });
  }

  async deleteFavorite(id: number): Promise<void> {
    await this.favoritesRepository.delete(id);
  }
}
