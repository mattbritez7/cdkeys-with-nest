import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { UsersService } from '../services/users.services';
import { FindUsersDto } from '../dtos/find.users.dto';
import { CreateUsersDto } from '../dtos/create.users.dto';
import { DeleteUsersDto } from '../dtos/delete.users.dto';
import { LoginUsersDto } from '../dtos/login.users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all')
  findAll(): any {
    return this.usersService.findAll();
  }
  @Post('one')
  findOne(@Body() findUsersDto: FindUsersDto): any {
    return this.usersService.findOne(findUsersDto);
  }
  @Post('create')
  createUser(@Body() createUsersDto: CreateUsersDto): any {
    return this.usersService.createUser(createUsersDto);
  }
  @Post('')
  deleteUser(@Body() deleteUserDto: DeleteUsersDto): any {
    return this.usersService.deleteUser(deleteUserDto);
  }
  @Put('edit')
  editUser(): any {
    return this.usersService.editUser();
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUsersDto): any {
    return this.usersService.loginUser(loginUserDto);
  }
}
