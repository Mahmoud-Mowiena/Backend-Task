import {
  IFieldValidationError,
  Message,
  MutationResolver,
} from "@storexweb/kernel";
import IMovie from "../../../Interface/IMovie";
import MovieRepository from "../../../Repository/MovieRepository";
import movieValidation from "../../../Validators/movieValidation";

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
    const movieRepo = this.getRepository<MovieRepository>("movie");
    const movieExist = await movieRepo?.findOneById(movie.id).catch((err) => {
      throw this.createServerErrorException(err);
    });

    if (!movieExist) throw this.createNotFoundException("Movie not found");

    await movieRepo?.update(args.movie, movie.id).catch((err) => {
      throw this.createServerErrorException(err);
    });

    return new Message("Movie Updated", 200);
  }
}
