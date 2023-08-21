import { Movie, Category } from '@prisma/client';
import { basename } from 'path';

export class MovieSerializer {
  id: number;
  title: string;
  description: string;
  category: { id: number; name: string; description: string | null };
  fil_url: string;
  constructor(movie: Movie & { category: Category }) {
    this.id = movie.id;
    this.title = movie.title;
    this.description = movie.description;
    this.category = movie.category;
    this.fil_url =
      'http://localhost:3000/movies/file' + basename(movie.file_path);
  }
}
