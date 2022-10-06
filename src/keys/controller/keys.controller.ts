import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { KeysService } from '../services/keys.service';
import { CreateKeysDto } from '../dtos/create-keys.dto';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}
  @Get('all')
  findAll(): any {
    return this.keysService.findAll();
  }
  @Post('create')
  createKey(@Body() createKeyDto: CreateKeysDto): any {
    return this.keysService.createKey(createKeyDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): any {
    return this.keysService.findOne(id);
  }
}
