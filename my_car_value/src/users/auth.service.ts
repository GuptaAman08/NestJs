import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const usersWithGivenEmail = await this.userService.find(email);
    if (usersWithGivenEmail.length) {
      throw new BadRequestException('email already exists');
    }

    // 16 char long salt ni hex decimal format
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hashedPassword.toString('hex');

    const user = await this.userService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password does not match');
    }

    return user;
  }
}
