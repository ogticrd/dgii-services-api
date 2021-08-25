import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'soap';

import { SOAP } from '@modules/soap/soap.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContributorsService {
  constructor(
    @Inject(SOAP) private readonly soapService: Client,
    private readonly configService: ConfigService,
  ) {}

  async getContributors(rnc: string) {
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

  async getContributorByName(name: string) {
    const ELEMENTS_PER_PAGE =
      +this.configService.get('DGII_WSDL_PAGINATION_LIMIT') || 15;
    const SEARCH_BY_NAME_CODE = 1;
    const SEARCH_FROM = 1;

    return new Promise((res, rej) => {
      const args = {
        value: name,
        patronBusqueda: SEARCH_BY_NAME_CODE,
        inicioFilas: SEARCH_FROM,
        filaFilas: ELEMENTS_PER_PAGE,
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
          res({ data: [], valid: true });
        }

        const data = result.GetContribuyentesResult.split('@@@').map(
          JSON.parse,
        );

        res({ data, valid: true });
      });
    });
  }
}
