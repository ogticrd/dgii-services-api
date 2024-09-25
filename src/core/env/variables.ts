import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EnvironmentSchema {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsOptional()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  DGII_WSDL_URI: string;

  @IsString()
  @IsNotEmpty()
  DGII_WSDL_PAGINATION_LIMIT: string;

  @IsString()
  @IsNotEmpty()
  GCP_CREDENTIALS: string;
}
