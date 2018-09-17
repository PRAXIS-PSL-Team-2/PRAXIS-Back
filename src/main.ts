import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const options = new DocumentBuilder()
  // .setTitle('PRAXIS API')
  // .setDescription('API Documentation')
  // .setVersion('1.0.0')
  // .setSchemes(AppModule.isDev ? 'http' : 'https')
  // .addBearerAuth()
  // .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/api/v1/docs', app, document);
  
  //http://localhost:3000 : https://whateverwhatever.com
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}`: AppModule.host;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('PRAXIS API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setHost(hostDomain.split('//')[1])
    .setSchemes(AppModule.isDev ? 'http' : 'https')
    .setBasePath('/api/v1')
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  app.use('/api/v1/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('/api/v1/docs', app, null, {
    swaggerUrl: `${hostDomain}/api/v1/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(AppModule.port);
}
bootstrap();
