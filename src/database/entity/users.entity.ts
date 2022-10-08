import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {
  //primarygeneratedcolumn **autoincrement**
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column('text')
  password: string;

  @Column() //definis columnas en la bd
  isAdmin: boolean;
}
