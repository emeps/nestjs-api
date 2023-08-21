import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) {}
  async create(createMovieDto: CreateMovieDto & { file: Express.Multer.File }) {
    const categoryExists =
      (await this.prismaService.category.count({
        where: {
          id: createMovieDto.category_id,
        },
      })) != 0;

    if (!categoryExists) {
      throw new InvalidRelationError('Category does not exist');
    }
    return this.prismaService.movie.create({
      data: {
        title: createMovieDto.title,
        description: createMovieDto.description,
        category_id: createMovieDto.category_id,
        file_path: createMovieDto.file.path,
      },
    });
  }

  findAll() {
    return this.prismaService.movie.findMany({
      include: {
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.movie.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.prismaService.movie.update({
      where: { id },
      data: {
        title: updateMovieDto.title,
        description: updateMovieDto.description,
        category_id: updateMovieDto.category_id,
        file_path: 'faker/video.mp4',
      },
    });
  }

  remove(id: number) {
    return this.prismaService.movie.delete({
      where: { id },
    });
  }
}
