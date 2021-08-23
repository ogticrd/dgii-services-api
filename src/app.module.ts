import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContributorsModule } from './modules/contributors/contributors.module';
import { SoapModule } from './modules/soap/soap.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContributorsModule, SoapModule],
})
export class AppModule {
  static port: number;
  static apiVersion: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
    AppModule.apiVersion = this.configService.get('API_VERSION');
  }
}
