import { Test } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Gender } from '../interfaces/cat.interface';
import { of } from 'rxjs';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([])],
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('create', () => {
    it('should create a new cat', async () => {
      const createCatDto: CreateCatDto = {
        age: 2,
        breed: 'Bombay',
        color: 'black',
        gender: Gender.MALE,
        isAdopted: false,
        name: 'Pixel',
      };
      const result: Cat = {
        id: 1,
        ...createCatDto,
      };
      jest.spyOn(catsService, 'create').mockImplementation(() => of(result).toPromise());

      expect(await catsController.create(createCatDto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', async () => {
      const catId = 1;
      const result: Cat = {
        id: catId,
        age: 2,
        breed: 'Bombay',
        color: 'black',
        gender: 'male',
        isAdopted: false,
        name: 'Pixel',
      };
      jest.spyOn(catsService, 'findOne').mockImplementation(() => of(result).toPromise());

      expect(await catsController.findOne(catId)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a cat by id', async () => {
      const catId = 1;
      const updateCatDto: CreateCatDto = {
        age: 3,
        breed: 'Bengal',
        color: 'tabby',
        gender: Gender.MALE,
        isAdopted: false,
        name: 'Pixel',
      };
      const result: Cat = {
        id: catId,
        ...updateCatDto,
      };
      jest.spyOn(catsService, 'update').mockImplementation(() => of(result).toPromise());

      expect(await catsController.update(catId, updateCatDto)).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a cat by id', async () => {
      const catId = 1;
      jest.spyOn(catsService, 'delete').mockImplementation(() => of(undefined).toPromise());

      await catsController.delete(catId);

      expect(catsService.delete).toHaveBeenCalledWith(catId);
    });
  });
});
