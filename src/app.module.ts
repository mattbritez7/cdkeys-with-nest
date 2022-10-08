import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeysController } from './keys/controller/keys.controller';
import { KeysService } from './keys/services/keys.service';
import { UsersService } from './users/services/users.services';
import { UsersController } from './users/controller/users.controller';

@Module({
  imports: [],
  controllers: [AppController, KeysController, UsersController],
  providers: [AppService, KeysService, UsersService],
})
export class AppModule {}
