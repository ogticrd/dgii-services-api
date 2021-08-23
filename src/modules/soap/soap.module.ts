import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, createClient } from 'soap';

export const SOAP = 'SOAP';

const SoapConnectionFactory = {
  provide: SOAP,
  inject: [ConfigService],
  async useFactory(configService: ConfigService): Promise<Client> {
    return new Promise((res, rej) => {
      const url: string = configService.get('DGII_WSDL_URI');
      createClient(url, function (err, client) {
        if (err) {
          rej(err);
        }

        res(client);
      });
    });
  },
};

@Module({
  providers: [SoapConnectionFactory],
  exports: [SoapConnectionFactory],
})
export class SoapModule implements OnModuleInit {
  private readonly logger = new Logger(SoapModule.name);

  onModuleInit() {
    this.logger.log('🚀 SOAP Module configured');
  }
}
