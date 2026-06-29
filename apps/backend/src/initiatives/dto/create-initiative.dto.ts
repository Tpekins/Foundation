import { IsString, IsOptional } from 'class-validator';

export class CreateInitiativeDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
