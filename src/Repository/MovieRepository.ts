import { BaseRepository } from "@storexweb/kernel";
import IMovie from "Interface/IMovie";

export default class MovieRepository extends BaseRepository {
  /**
   * Find all movies that belong to a given category name.
   * @param categoryName - the category name to filter by.
   * @returns list of matching movies
   */
  async findByCategoryName(categoryName: string): Promise<IMovie[]> {
    const query = {
      "category.name": categoryName,
    };

    return this.model.find(await this.createQuery(query));
  }
}
