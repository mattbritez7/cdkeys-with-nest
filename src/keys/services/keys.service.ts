import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { keys } from 'src/database/entity/keys.entity';
import { AppDataSource } from 'src/database';
import { CreateKeysDto } from '../dtos/create-keys.dto';

@Injectable()
export class KeysService {
  async createKey(createKeyDto: CreateKeysDto): Promise<any> {
    const { name, description, isPublished } = createKeyDto;

    if (name || description || isPublished === undefined) {
      throw new HttpException(
        'No puede ser undefined',
        HttpStatus.LENGTH_REQUIRED, //le da un status code de forma pro
      );
    }

    const newKey = new keys(); //crea una instancia de la entidad key
    newKey.name = name;
    newKey.description = description;
    newKey.isPublished = isPublished;
    await AppDataSource.manager.save(newKey); //guarda la nueva operacion
    return newKey;
  }

  async findAll(): Promise<any> {
    const keyRepository = AppDataSource.getRepository(keys); //accede al repositorio
    const allKeys = await keyRepository.find(); //busca de forma total
    return allKeys;
  }

  async findOne(id: number): Promise<any> {
    const keyRepository = AppDataSource.getRepository(keys);
    const keyId = await keyRepository.findOneBy({ id: id }); //busca por id
    return keyId;
  }
}
