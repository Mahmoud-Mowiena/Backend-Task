import { ISchemaID, QueryResolver } from "@storexweb/kernel";
import ICategory from "Interface/ICategory";
import CategoryRepository from "Repository/CategoryRepository";

export default class Category extends QueryResolver {
  activate(): boolean | object {
    return this.activateCheck("VIEW_CATEGORY", {
      created_by: this.getUser()?.id,
    });
  }

  async execute(args: { id: ISchemaID }): Promise<ICategory> {
    const category = <ICategory>await this.getRepository<CategoryRepository>(
      "category"
    )
      ?.findOneById(args.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    if (!category) throw this.createNotFoundException("category not found");
    return category;
  }
}
