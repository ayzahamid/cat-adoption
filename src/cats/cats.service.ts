import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';


@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: CreateCatDto): Promise<Cat> {
    await this.catRepository.update(id, updateCatDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
