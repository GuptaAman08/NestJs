import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messageRepo: MessageRepository) {}

  async findOne(id: string) {
    return this.messageRepo.findOne(id);
  }

  async findAll() {
    return this.messageRepo.findAll();
  }

  async create(content: string) {
    return this.messageRepo.create(content);
  }
}
