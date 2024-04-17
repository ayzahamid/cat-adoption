import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @Roles(['admin'])
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.catsService.delete(id);
  }
}
