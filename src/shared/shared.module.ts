import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';

@Global()
@Module({
  providers: [ConfigurationService, AuthService, JwtStrategyService],
  exports: [ConfigurationService,AuthService],
})
export class SharedModule {}
