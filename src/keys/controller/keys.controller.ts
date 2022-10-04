import { Controller, Get, Param } from '@nestjs/common';

@Controller('keys')
export class KeysController {
  @Get('all')
  findAll(): string {
    return 'Retorna todas las keys!';
  }
  @Get(':id')
  findOne(@Param('id') id: number): string {
    return 'hola soy la key numero ' + id;
  }
}
