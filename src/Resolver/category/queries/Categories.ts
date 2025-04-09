import { QueryResolver, ResponseWithPagination } from "@storexweb/kernel";
import { categoryFilters } from "Filter/categoryFilters";
import CategoryRepository from "Repository/CategoryRepository";
import { categorySearch } from "Search/categorySearch";

export default class Categories extends QueryResolver {
  activate(): boolean | object {
    return this.activateCheck("VIEW_CATEGORY", {
      created_by: this.getUser()?.id,
    });
  }

  async execute(): Promise<ResponseWithPagination> {
    return ResponseWithPagination.createListingResponse(
      this.getRepository<CategoryRepository>("movie"),
      categoryFilters,
      categorySearch
    ).catch((err) => {
      throw this.createServerErrorException(err);
    });
  }
}
