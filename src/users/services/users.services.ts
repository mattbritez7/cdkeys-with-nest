import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { users } from '../../database/entity/users.entity';
import { AppDataSource } from 'src/database';

@Injectable()
export class UsersService {
  async findAll(): Promise<object> {
    const userReposity = AppDataSource.getRepository(users);
    const allUsers = await userReposity.find();
    return allUsers;
  }

  async findOne(findUsersDto: any): Promise<object> {
    const { email } = findUsersDto;
    const userReposity = AppDataSource.getRepository(users);
    const allUsers = await userReposity.find({
      where: {
        email: email,
      },
    });
    return allUsers;
  }

  async createUser(createUsersDto: any): Promise<any> {
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

  async deleteUser(deleteUsersDto: any): Promise<object> {
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

  async loginUser(loginUserDto: any): Promise<any> {
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
  async detailUser(req: any): Promise<any> {
    try {
      const tokenUser = req.headers.authorization;
      const decoded = jwt.verify(tokenUser, 'JWT_SECRET');
      return decoded;
    } catch (err) {
      console.error(err);
    }
  }
}
