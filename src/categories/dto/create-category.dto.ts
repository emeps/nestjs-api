import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}
