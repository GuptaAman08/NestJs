import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function boostrap() {
    const app = NestFactory.create(AppModule)

    await (await app).listen(3000)
}

boostrap()