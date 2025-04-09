import {
  Message,
  MutationResolver,
  IFieldValidationError,
  warn,
} from "@storexweb/kernel";
import CategoryRepository from "Repository/CategoryRepository";
import ICategory from "Interface/ICategory";
import categoryValidation from "Validators/categoryValidation";

export default class CreateCategory extends MutationResolver {
  activate(): boolean {
    return this.getUser()?.can("CREATE_CATEGORY");
  }

  async validate(args: {
    category: ICategory;
  }): Promise<IFieldValidationError[]> {
    return this.applyValidation(categoryValidation, args.category);
  }

  async execute(args: { category: ICategory }): Promise<Message> {
    const categoryRepo = this.getRepository<CategoryRepository>("category");

    const category: ICategory = await categoryRepo.findOneByName(
      args.category.name
    );

    if (category) {
      throw this.createValidationException(
        `Category "${args.category.name}" already exists`
      );
    }

    await categoryRepo?.create(args.category).catch((err) => {
      throw this.createServerErrorException(err);
    });

    return new Message("Category has been created successfully.", 201);
  }
}
