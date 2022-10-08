import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { users } from '../../database/entity/users.entity';
import { AppDataSource } from 'src/database';
import { FindUsersDto } from '../dtos/find.users.dto';
import { CreateUsersDto } from '../dtos/create.users.dto';
import { DeleteUsersDto } from '../dtos/delete.users.dto';
// import { EditUsersDto } from '../dtos/edit.users.dto';

@Injectable()
export class UsersService {
  async findAll(): Promise<object> {
    const userReposity = AppDataSource.getRepository(users);
    const allUsers = await userReposity.find();
    return allUsers;
  }
  async findOne(findUsersDto: FindUsersDto): Promise<object> {
    const { email } = findUsersDto;
    const userReposity = AppDataSource.getRepository(users);
    const allUsers = await userReposity.find({
      where: {
        email: email,
      },
    });
    return allUsers;
  }
  async createUser(createUsersDto: CreateUsersDto): Promise<any> {
    const { email, password, isAdmin } = createUsersDto;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds); //seteamos el number hash
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt); //hasheamos la password
    const newUser = new users();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.isAdmin = isAdmin;
    await AppDataSource.manager.save(newUser); //guarda la nueva operacion
    return newUser;
  }
  async deleteUser(deleteUsersDto: DeleteUsersDto): Promise<object> {
    const { email } = deleteUsersDto;
    const userReposity = AppDataSource.getRepository(users);
    const userToDelete = await userReposity.find({
      where: {
        email: email,
      },
    });
    await userReposity.remove(userToDelete);
    return userToDelete;
  }
  async editUser(): Promise<any> {
    const usersRepository = AppDataSource.getRepository(users);
    console.log(usersRepository);
  }
}
