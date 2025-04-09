import {
  IFieldValidationError,
  Message,
  MutationResolver,
} from "@storexweb/kernel";
import IMovie from "../../../Interface/IMovie";
import MovieRepository from "../../../Repository/MovieRepository";
import movieValidation from "../../../Validators/movieValidation";
import CategoryRepository from "../../../Repository/CategoryRepository";
import ICategory from "../../../Interface/ICategory";

export default class UpdateMovie extends MutationResolver {
  activate(): boolean | object {
    if (!this.getUser()?.can("UPDATE_MOVIE")) return false;
    return this.activateCheck("VIEW_MOVIE", {
      created_by: this.getUser()?.id,
    });
  }

  async validate(args: { movie: IMovie }): Promise<IFieldValidationError[]> {
    return this.applyValidation(movieValidation, args.movie);
  }

  async execute(args: { movie: IMovie }): Promise<Message> {
    const movie = args.movie;

    const movieExist = await this.getRepository<MovieRepository>("movie")
      ?.findOneById(movie.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    if (!movieExist) throw this.createNotFoundException("Movie not found");

    const categoryRepo = this.getRepository<CategoryRepository>("category");
    const category: ICategory = await categoryRepo.findOneByName(
      movie.category
    );

    if (!category) {
      throw this.createValidationException(
        `Category "${movie.category}" not found`
      );
    }

    const movieToUpdate: IMovie = {
      ...movie,
      category: category.id,
    };

    await this.getRepository<MovieRepository>("movie")
      ?.update(movieToUpdate, movie.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    return new Message("Movie Updated", 200);
  }
}
