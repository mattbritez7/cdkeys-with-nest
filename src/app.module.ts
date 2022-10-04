import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeysController } from './keys/controller/keys.controller';

@Module({
  imports: [],
  controllers: [AppController, KeysController],
  providers: [AppService],
})
export class AppModule {}
