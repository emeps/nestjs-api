import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  category_id: number;
}

export class CreateMovieWithUploadDto extends CreateMovieDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
