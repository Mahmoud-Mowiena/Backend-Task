import { QueryResolver, ResponseWithPagination } from "@storexweb/kernel";
import { movieFilters } from "Filter/movieFilters";
import MovieRepository from "Repository/MovieRepository";
import { movieSearch } from "Search/movieSearch";

export default class Movies extends QueryResolver {
  activate(): boolean | object {
    return this.activateCheck("VIEW_MOVIE", { created_by: this.getUser()?.id });
  }

  async execute(): Promise<ResponseWithPagination> {
    return ResponseWithPagination.createListingResponse(
      this.getRepository<MovieRepository>("movie"),
      movieFilters,
      movieSearch
    ).catch((err) => {
      throw this.createServerErrorException(err);
    });
  }
}
