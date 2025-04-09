import { ISchemaID, QueryResolver } from "@storexweb/kernel";
import IMovie from "Interface/IMovie";
import MovieRepository from "Repository/MovieRepository";

export default class Movie extends QueryResolver {
  activate(): boolean | object {
    return this.activateCheck("VIEW_MOVIE", { created_by: this.getUser()?.id });
  }

  async execute(args: { id: ISchemaID }): Promise<IMovie> {
    const movie = <IMovie>await this.getRepository<MovieRepository>("movie")
      ?.findOneById(args.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    if (!movie) throw this.createNotFoundException("movie not found");
    return movie;
  }
}
