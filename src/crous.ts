import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class Crous {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  zone: string;

  @IsString()
  nom: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsString()
  @IsOptional()
  informations?: string;

  @IsString()
  @IsOptional()
  closing?: string;

  @IsArray()
  @IsOptional()
  geolocalisation?: number[];

  @IsString()
  @IsOptional()
  zone2?: string;

  @IsString()
  @IsOptional()
  crousandgo?: string;

  @IsString()
  @IsOptional()
  album?: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
