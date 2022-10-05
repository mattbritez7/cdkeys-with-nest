import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class keys {
  //primarygeneratedcolumn **autoincrement**
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100, //definis caracteristicas de la field
  })
  name: string;

  @Column('text')
  description: string;

  @Column() //definis columnas en la bd
  isPublished: boolean;
}
