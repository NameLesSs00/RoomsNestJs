import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import open from 'open'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Rooms API')
    .setDescription('API for rooms App')
    .setVersion('1.0')
    .addTag('rooms')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`The app is running on http://localhost:${port}/api`);

  // auto open swagger interface when running in dev mode
  // if (process.env.NODE_ENV !== 'production') {
  //   await open(`http://localhost:${port}/api`);
  // }
}
bootstrap();