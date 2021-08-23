import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

@Exclude()
export class ResponseContributor {
  @Expose({ name: 'RGE_RUC' })
  @IsString()
  @ApiProperty()
  rnc: string;

  @Expose({ name: 'RGE_NOMBRE' })
  @IsString()
  @ApiProperty()
  name: string;

  @Expose({ name: 'NOMBRE_COMERCIAL' })
  @IsString()
  @ApiProperty()
  commercialName: string;

  @Expose({ name: 'CATEGORIA' })
  @IsString()
  @ApiProperty()
  category: string;

  @Expose({ name: 'REGIMEN_PAGOS' })
  @IsString()
  @ApiProperty()
  paymentScheme: string;

  @Expose({ name: 'ESTATUS' })
  @ApiProperty()
  status: string;
}

@Exclude()
export class ResponseContributorDto {
  @Expose()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  valid: boolean;

  @Expose()
  @Type(() => ResponseContributor)
  @ApiProperty({ type: ResponseContributor })
  data: ResponseContributor;
}
