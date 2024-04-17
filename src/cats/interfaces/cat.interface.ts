export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface Cat {
  id: number;
  age: number;
  breed: string;
  name: string;
  color: string;
  gender: string;
  isAdopted: boolean;
}
export interface CreateCatDto {
  age: number;
  breed: string;
  color: string;
  gender: Gender;
  isAdopted: boolean;
  name: string;
}
