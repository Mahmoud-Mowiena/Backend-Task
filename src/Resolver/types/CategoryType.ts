import { TypeResolver } from "@storexweb/kernel";
import ICategory from "Interface/ICategory";
import IMovie from "Interface/IMovie";
import CategoryRepository from "Repository/CategoryRepository";

export default class CategoryType extends TypeResolver {
  public provide = ["category"];

  category(_args: unknown, parent: IMovie) {
    return this.getRepository<CategoryRepository>("category")?.findOneById(
      parent.category
    );
  }
}
