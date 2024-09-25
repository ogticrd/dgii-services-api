import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ContributorsModule } from '@modules/contributors';
import { EnvironmentSchema, validate } from '@core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ContributorsModule,
  ],
})
export class AppModule {
  static port: number;

  constructor(
    private readonly configService: ConfigService<EnvironmentSchema>,
  ) {
    AppModule.port = +this.configService.get('PORT');
  }
}
