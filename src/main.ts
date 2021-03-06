import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('PRAXIS API')
  .setDescription('API Documentation')
  .setVersion('1.0.0')
  .setSchemes(AppModule.isDev ? 'http' : 'https')
  .addBearerAuth('Authorization', 'header')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v1/docs', app, document);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:4200', 'https://frontend-homework.herokuapp.com']
  });

  await app.listen(AppModule.port);
}
bootstrap();

