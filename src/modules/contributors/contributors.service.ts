import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'soap';

import { SOAP } from '@modules/soap/soap.module';

@Injectable()
export class ContributorsService {
  constructor(@Inject(SOAP) private readonly soapService: Client) {}

  async main(rnc: string) {
    return new Promise((res, rej) => {
      const args = {
        value: rnc,
        patronBusqueda: 0,
        inicioFilas: 1,
        filaFilas: 1,
        IMEI: '',
      };

      this.soapService.GetContribuyentes(args, function (err, result) {
        if (err) {
          rej(err);
        }

        const isValidRequest =
          result &&
          result.GetContribuyentesResult &&
          result.GetContribuyentesResult !== '0';

        if (!isValidRequest) {
          rej(
            new NotFoundException({
              message: 'Resource not found',
              valid: false,
            }),
          );
        }

        const data = JSON.parse(result.GetContribuyentesResult);

        res({ data, valid: true });
      });
    });
  }
}
