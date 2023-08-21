import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  category_id: number;
}
