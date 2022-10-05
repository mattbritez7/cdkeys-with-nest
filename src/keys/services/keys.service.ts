import { Injectable } from '@nestjs/common';

@Injectable()
export class KeysService {
  findAll(): string {
    return 'Retorna todas las keys!';
  }
  findOne(id: number): string {
    return 'Hola soy la key numero ' + id;
  }
}
