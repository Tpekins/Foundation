import { IsString, IsOptional } from 'class-validator';

export class UpdateRootsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoTitle?: string;

  @IsOptional()
  @IsString()
  youtubeId?: string;

  @IsOptional()
  @IsString()
  imageUrls?: string;
}
