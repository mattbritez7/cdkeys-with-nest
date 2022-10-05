import { Controller, Get, Param } from '@nestjs/common';
import { KeysService } from '../services/keys.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}
  @Get('all')
  findAll(): string {
    return this.keysService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.keysService.findOne(id);
  }
}
