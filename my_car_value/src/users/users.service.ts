import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      // adding this check since when id is null, the sqlite:db fetched the first row by default
      throw new NotFoundException('No such signed in user');
    }

    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async find(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async update(id: number, userAttrs: Partial<User>) {
    const user: any = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, userAttrs);
    console.log(user, userAttrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user: any = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
