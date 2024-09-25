import { IsString, IsBoolean, IsObject } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Contributor {
  @IsString()
  @ApiProperty()
  @Expose({ name: 'RGE_RUC' })
  rnc: string;

  @IsString()
  @ApiProperty()
  @Expose({ name: 'RGE_NOMBRE' })
  name: string;

  @IsString()
  @ApiProperty()
  @Expose({ name: 'NOMBRE_COMERCIAL' })
  commercialName: string;

  @IsString()
  @ApiProperty()
  @Expose({ name: 'CATEGORIA' })
  category: string;

  @IsString()
  @ApiProperty()
  @Expose({ name: 'REGIMEN_PAGOS' })
  paymentScheme: string;

  @IsString()
  @ApiProperty()
  @Expose({ name: 'ESTATUS' })
  status: string;
}

export class ContributorResponseDto {
  @Expose()
  @IsBoolean()
  @ApiProperty()
  valid: boolean;

  @Expose()
  @IsObject()
  @Type(() => Contributor)
  @ApiProperty({ type: Contributor })
  data: Contributor;
}
