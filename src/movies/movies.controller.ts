import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  CreateMovieDto,
  CreateMovieWithUploadDto,
} from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieFileValidator } from './video-file.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MovieSerializer } from './movies.serializer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateMovieWithUploadDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MovieFileValidator({
            maxSize: 1024 * 1024 * 100,
            mimetype: 'video/mp4',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.moviesService.create({ ...createMovieDto, file });
  }

  @Get()
  async findAll() {
    const movies = this.moviesService.findAll();
    return movies.map((movie) => new MovieSerializer(movie));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }

  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    createReadStream(join(process.cwd(), 'uploads', file)).pipe(res);
  }
}
