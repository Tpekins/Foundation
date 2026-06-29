import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  donorName: string;

  @IsOptional()
  @IsString()
  projectId?: string;
}
