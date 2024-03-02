import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    // Returns one record or null
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    // returns an array with records or an empty array
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  remove() {}
}
