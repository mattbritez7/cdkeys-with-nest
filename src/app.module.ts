import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeysController } from './keys/controller/keys.controller';
import { KeysService } from './keys/services/keys.service';

@Module({
  imports: [],
  controllers: [AppController, KeysController],
  providers: [AppService, KeysService],
})
export class AppModule {}
