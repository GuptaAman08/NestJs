import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    getRootRoute(){
        return "Nest App is working awesome!!"
    }
}