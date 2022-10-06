import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { KeysService } from '../services/keys.service';
import { CreateKeysDto } from '../dtos/create-keys.dto';
import { EditKeysDto } from '../dtos/edit-keys.dto';
import { DeleteKeysDto } from '../dtos/delete-keys.dto';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Post('create')
  createKey(@Body() createKeyDto: CreateKeysDto): any {
    return this.keysService.createKey(createKeyDto);
  }

  @Get('all')
  findAll(): any {
    return this.keysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): any {
    return this.keysService.findOne(id);
  }

  @Put('edit')
  editKey(@Body() editKeyDto: EditKeysDto): any {
    return this.keysService.editKey(editKeyDto);
  }

  @Delete('delete')
  deleteKey(@Body() deleteKeyDto: DeleteKeysDto): any {
    return this.keysService.deleteKey(deleteKeyDto);
  }
}
