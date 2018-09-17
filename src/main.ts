import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('PRAXIS API')
  .setDescription('API Documentation')
  .setVersion('1.0.0')
  .setSchemes('https')
  .addBearerAuth()
  .build();

  // .setSchemes(AppModule.isDev ? 'http' : 'https')
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v1/docs', app, document);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

