import { ISchemaID, Message, MutationResolver } from "@storexweb/kernel";
import MovieRepository from "../../../Repository/MovieRepository";

export default class DeleteMovie extends MutationResolver {
  activate(): boolean | object {
    if (!this.getUser()?.can("DELETE_MOVIE")) return false;
    return this.activateCheck("VIEW_MOVIE", { created_by: this.getUser()?.id });
  }

  async execute(args: { id: ISchemaID }): Promise<Message> {
    const movie = await this.getRepository<MovieRepository>("movie")
      ?.findOneById(args.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    if (!movie) {
      throw this.createNotFoundException("Movie not found");
    }

    await this.getRepository<MovieRepository>("movie")
      ?.delete(args.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    return new Message("Movie Deleted", 200);
  }
}
