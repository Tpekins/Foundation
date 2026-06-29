import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateFieldLogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  metrics?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
