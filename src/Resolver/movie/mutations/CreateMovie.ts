import {
  Message,
  MutationResolver,
  IFieldValidationError,
} from "@storexweb/kernel";
import IMovie from "Interface/IMovie";
import MovieRepository from "Repository/MovieRepository";
import movieValidation from "Validators/movieValidation";

export default class CreateMovie extends MutationResolver {
  activate(): boolean {
    return this.getUser()?.can("CREATE_MOVIE");
  }

  async validate(args: { movie: IMovie }): Promise<IFieldValidationError[]> {
    return this.applyValidation(movieValidation, args.movie);
  }

  async execute(args: { movie: IMovie }): Promise<Message> {
    await this.getRepository<MovieRepository>("movie")
      ?.create(args.movie)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    return new Message("Movie has been created successfully.", 201);
  }
}
