import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('greeting')
//el decorator @controller 'greeting' es la primera barra de la solicitud http
export class AppController {
  constructor(private readonly appService: AppService) {}
  //el decorator @get es la segunda barra example: tatata/greeting/say
  @Get('say')
  @HttpCode(201)
  //el decorator @HttpCode se encarga de fijar el status code
  getHello(): string {
    return this.appService.getHello();
  }
}
