import {
  Message,
  MutationResolver,
  IFieldValidationError,
  warn,
} from "@storexweb/kernel";
import IMovie from "Interface/IMovie";
import MovieRepository from "Repository/MovieRepository";
import CategoryRepository from "Repository/CategoryRepository";
import ICategory from "Interface/ICategory";
import movieValidation from "Validators/movieValidation";

export default class CreateMovie extends MutationResolver {
  activate(): boolean {
    return this.getUser()?.can("CREATE_MOVIE");
  }

  async validate(args: { movie: IMovie }): Promise<IFieldValidationError[]> {
    return this.applyValidation(movieValidation, args.movie);
  }

  async execute(args: { movie: IMovie }): Promise<Message> {
    try {
      const categoryRepo = this.getRepository<CategoryRepository>("category");

      const category: ICategory = await categoryRepo.findOneByName(
        args.movie.category
      );

      if (!category) {
        throw this.createValidationException(
          `Category "${args.movie.category}" not found`
        );
      }

      const movieToSave: IMovie = {
        ...args.movie,
        category: category.id,
      };

      await this.getRepository<MovieRepository>("movie")?.create(movieToSave);

      return new Message("Movie has been created successfully.", 201);
    } catch (e) {
      warn(e);
      throw this.createServerErrorException(e);
    }
  }
}
