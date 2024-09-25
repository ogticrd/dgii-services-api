import { ConfigService } from '@nestjs/config';
import { Client, createClient } from 'soap';
import { EnvironmentSchema } from '@core';

export const SoapConnectionFactory = {
  provide: Client,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService<EnvironmentSchema>) => {
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
