import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'soap';

import { SOAP } from '@modules/soap/soap.module';
import { ErrorDefinition } from '@common/enums';

@Injectable()
export class ContributorsService {
  private readonly emptyString = '';

  constructor(
    @Inject(SOAP) private readonly soapService: Client,
    private readonly configService: ConfigService,
  ) {}

  async getContributors(rnc: string) {
    return new Promise((res, rej) => {
      const SEARCH_BY_NAME_RNC = 0;
      const SEARCH_FROM = 1;
      const ELEMENTS_QUANTITY = 1;

      const args = {
        value: rnc,
        patronBusqueda: SEARCH_BY_NAME_RNC,
        inicioFilas: SEARCH_FROM,
        filaFilas: ELEMENTS_QUANTITY,
        IMEI: this.emptyString,
      };

      this.soapService.GetContribuyentes(
        args,
        (err: any, result: any) => {
          if (err) {
            if (err.message.includes('timeout')) {
              return rej(
                new RequestTimeoutException({
                  message: 'Request timeout exceeded',
                  errorCode: ErrorDefinition.TIMEOUT_EXCEEDED,
                }),
              );
            }

            return rej(
              new InternalServerErrorException({
                message: err.message,
                errorCode: ErrorDefinition.UNKNOWN_ERROR,
              }),
            );
          }

          const isValidRequest =
            result &&
            result.GetContribuyentesResult &&
            result.GetContribuyentesResult !== '0';

          if (!isValidRequest) {
            rej(
              new NotFoundException({
                message: 'Resource not found',
                errorCode: ErrorDefinition.NOT_FOUND,
              }),
            );
          }

          const data = JSON.parse(result.GetContribuyentesResult);

          res({ valid: true, data });
        },
        {
          timeout: 5000,
        },
      );
    });
  }

  async getContributorByName(name: string) {
    const ELEMENTS_PER_PAGE =
      +this.configService.get('DGII_WSDL_PAGINATION_LIMIT') || 20;
    const SEARCH_BY_NAME_CODE = 1;
    const SEARCH_FROM = 1;

    return new Promise((res, rej) => {
      const args = {
        value: name,
        patronBusqueda: SEARCH_BY_NAME_CODE,
        inicioFilas: SEARCH_FROM,
        filaFilas: ELEMENTS_PER_PAGE,
        IMEI: this.emptyString,
      };

      this.soapService.GetContribuyentes(
        args,
        function (err: any, result: any) {
          if (err) {
            if (err.message.includes('timeout')) {
              return rej(
                new RequestTimeoutException({
                  message: 'Request timeout exceeded',
                  errorCode: ErrorDefinition.TIMEOUT_EXCEEDED,
                }),
              );
            }

            return rej(
              new InternalServerErrorException({
                message: err.message,
                errorCode: ErrorDefinition.UNKNOWN_ERROR,
              }),
            );
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
        },
        {
          timeout: 5000,
        },
      );
    });
  }

  async getContributorsCount() {
    return new Promise((res, rej) => {
      const args = {
        value: this.emptyString,
        IMEI: this.emptyString,
      };

      this.soapService.GetContribuyentesCount(
        args,
        (err: any, result: any) => {
          if (err) {
            if (err.message.includes('timeout')) {
              return rej(
                new RequestTimeoutException({
                  message: 'Request timeout exceeded',
                  errorCode: ErrorDefinition.TIMEOUT_EXCEEDED,
                }),
              );
            }

            return rej(
              new InternalServerErrorException({
                message: err.message,
                errorCode: ErrorDefinition.UNKNOWN_ERROR,
              }),
            );
          }

          const isValidRequest =
            result &&
            result.GetContribuyentesCountResult &&
            result.GetContribuyentesCountResult !== '0';

          if (!isValidRequest) {
            res({ data: [], valid: true });
          }

          res({
            valid: true,
            data: { count: result.GetContribuyentesCountResult },
          });
        },
        {
          timeout: 50000,
        },
      );
    });
  }
}
