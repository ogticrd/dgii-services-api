import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'soap';

import { ErrorDefinition } from '@core';

@Injectable()
export class ContributorsService {
  private readonly emptyString = '';

  constructor(
    private readonly soapService: Client,
    private readonly configService: ConfigService,
  ) {}

  async getContributors(rnc: string) {
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

    try {
      const result = await this.callSoapService('GetContribuyentes', args);

      const isValidRequest =
        result &&
        result.GetContribuyentesResult &&
        result.GetContribuyentesResult !== '0';

      if (!isValidRequest) {
        throw new NotFoundException({
          message: 'Resource not found',
          errorCode: ErrorDefinition.NOT_FOUND,
        });
      }

      const data = JSON.parse(result.GetContribuyentesResult);

      return { valid: true, data };
    } catch (error) {
      this.handleSoapError(error);
    }
  }

  async getContributorByName(name: string) {
    const ELEMENTS_PER_PAGE =
      +this.configService.get('DGII_WSDL_PAGINATION_LIMIT') || 20;
    const SEARCH_BY_NAME_CODE = 1;
    const SEARCH_FROM = 1;

    const args = {
      value: name,
      patronBusqueda: SEARCH_BY_NAME_CODE,
      inicioFilas: SEARCH_FROM,
      filaFilas: ELEMENTS_PER_PAGE,
      IMEI: this.emptyString,
    };

    try {
      const result = await this.callSoapService('GetContribuyentes', args);

      const isValidRequest =
        result &&
        result.GetContribuyentesResult &&
        result.GetContribuyentesResult !== '0';

      if (!isValidRequest) {
        return { data: [], valid: true };
      }

      const data = result.GetContribuyentesResult.split('@@@').map(JSON.parse);

      return { data, valid: true };
    } catch (error) {
      this.handleSoapError(error);
    }
  }

  async getContributorsCount() {
    const args = {
      value: this.emptyString,
      IMEI: this.emptyString,
    };

    try {
      const result = await this.callSoapService('GetContribuyentesCount', args);

      const isValidRequest =
        result &&
        result.GetContribuyentesCountResult &&
        result.GetContribuyentesCountResult !== '0';

      if (!isValidRequest) {
        return { data: [], valid: true };
      }

      return {
        valid: true,
        data: { count: result.GetContribuyentesCountResult },
      };
    } catch (error) {
      this.handleSoapError(error);
    }
  }

  private async callSoapService(method: string, args: any) {
    return new Promise<any>((resolve, reject) => {
      this.soapService[method](
        args,
        (err: any, result: any) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        },
        { timeout: 10_000 },
      );
    });
  }

  private handleSoapError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error.message?.includes('timeout')) {
      throw new RequestTimeoutException({
        message: 'Request timeout exceeded',
        errorCode: ErrorDefinition.TIMEOUT_EXCEEDED,
      });
    }

    throw new InternalServerErrorException({
      message: error.message || 'An unknown error occurred',
      errorCode: ErrorDefinition.UNKNOWN_ERROR,
    });
  }
}
