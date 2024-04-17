import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cats')
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  color: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  isAdopted: boolean;

  @Column({ nullable: true })
  description?: string;
}
