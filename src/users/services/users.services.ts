import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { users } from '../../database/entity/users.entity';
import { AppDataSource } from 'src/database';
import { FindUsersDto } from '../dtos/find.users.dto';
import { CreateUsersDto } from '../dtos/create.users.dto';
import { DeleteUsersDto } from '../dtos/delete.users.dto';
import { LoginUsersDto } from '../dtos/login.users.dto';

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
    try {
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
    } catch (error) {
      console.error(Error);
    }
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
  async loginUser(loginUserDto: LoginUsersDto): Promise<any> {
    try {
      const { email, password } = loginUserDto;
      const userReposity = AppDataSource.getRepository(users);
      const user = await userReposity.findOneByOrFail({
        email: email,
      });
      const pswUser = user.password;
      const compare = bcrypt.compare(password, pswUser);
      if (await compare) {
        const syncToken = jwt.sign(
          {
            payload: user,
          },
          'JWT_SECRET',
        );
        return {
          msg: 'Good login',
          syncToken,
        };
      } else {
        return 'Bad login';
      }
    } catch (err) {
      console.log(err);
    }
  }
}
