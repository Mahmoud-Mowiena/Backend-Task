import {
  IFieldValidationError,
  Message,
  MutationResolver,
} from "@storexweb/kernel";
import CategoryRepository from "../../../Repository/CategoryRepository";
import ICategory from "../../../Interface/ICategory";
import categoryValidation from "Validators/categoryValidation";

export default class UpdateCategory extends MutationResolver {
  activate(): boolean | object {
    if (!this.getUser()?.can("UPDATE_CATEGORY")) return false;
    return this.activateCheck("VIEW_CATEGORY", {
      created_by: this.getUser()?.id,
    });
  }

  async validate(args: {
    category: ICategory;
  }): Promise<IFieldValidationError[]> {
    return this.applyValidation(categoryValidation, args.category);
  }

  async execute(args: { category: ICategory }): Promise<Message> {
    const category = args.category;
    const categoryRepo = this.getRepository<CategoryRepository>("category");
    const categoryExist = await categoryRepo
      ?.findOneById(category.id)
      .catch((err) => {
        throw this.createServerErrorException(err);
      });

    if (!categoryExist)
      throw this.createNotFoundException("Category not found");

    await categoryRepo?.update(category, category.id).catch((err) => {
      throw this.createServerErrorException(err);
    });

    return new Message("Category Updated", 200);
  }
}
