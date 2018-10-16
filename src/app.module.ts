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
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://admin:admin123@ds159772.mlab.com:59772/praxisdb', { useNewUrlParser: true }), SharedModule, AuthModule, UsersModule, StudentsModule, ProfessorsModule, PraxisModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_FILTER,
      useClass: HttpExceptionFilter,
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
