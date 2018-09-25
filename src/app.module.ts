import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { PraxisModule } from './praxis/praxis.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://admin:admin123@ds159772.mlab.com:59772/praxisdb', { useNewUrlParser: true }), SharedModule, UsersModule, StudentsModule, PraxisModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;
  
  constructor(private readonly _configurationService: ConfigurationService){
    AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param,10): param;

    if(isNaN(portNumber)) return param;
    else if (portNumber >=  0) return portNumber;
  }

}
