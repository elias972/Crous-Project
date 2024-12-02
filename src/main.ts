import { NestFactory } from '@nestjs/core';
import { CrousModule } from './crous.module';

async function bootstrap() {
  const app = await NestFactory.create(CrousModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
