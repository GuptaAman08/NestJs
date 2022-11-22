import { Controller, Get, Post, Body, Param  } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messageService: MessagesService;

    constructor(){
        this.messageService = new MessagesService()
    }

    @Get()
    listAllMessages(){
        return this,this.messageService.findAll()
    }
    
    @Post()
    createMessage(@Body() body: CreateMessageDto){
        console.log(body);
        return this,this.messageService.create(body.content)
    }
    
    @Get('/:id')
    getMessage(@Param('id') id: string) {
        console.log(id);
        return this,this.messageService.findOne(id)
    }
}
