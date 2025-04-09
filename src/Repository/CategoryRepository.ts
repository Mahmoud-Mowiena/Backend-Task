import { BaseRepository, ISchemaID } from "@storexweb/kernel";
import ICategory from "Interface/ICategory";

export default class CategoryRepository extends BaseRepository {
  /**
   * Finds a category by its name.
   * @param categoryName - The name of the category to find.
   * @returns A promise that resolves to the found category, or null if no category is found.
   */
  async findOneByName(category: string | ISchemaID): Promise<ICategory | null> {
    const query = {
      name: category,
    };

    return this.model.findOne(await this.createQuery(query));
  }
}
