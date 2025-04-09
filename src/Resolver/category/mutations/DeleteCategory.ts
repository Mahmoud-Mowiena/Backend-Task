import { ISchemaID, Message, MutationResolver } from "@storexweb/kernel";
import CategoryRepository from "Repository/CategoryRepository";
import MovieRepository from "Repository/MovieRepository";

export default class DeleteCategory extends MutationResolver {
  activate(): boolean | object {
    if (!this.getUser()?.can("DELETE_CATEGORY")) return false;
    return this.activateCheck("VIEW_CATEGORY", {
      created_by: this.getUser()?.id,
    });
  }

  async execute(args: { id: ISchemaID }): Promise<Message> {
    const categoryRepo = this.getRepository<CategoryRepository>("category");
    const category = await categoryRepo?.findOneById(args.id).catch((err) => {
      throw this.createServerErrorException(err);
    });

    if (!category) {
      throw this.createNotFoundException("category not found");
    }

    const moviesUsingCategory = await this.getRepository<MovieRepository>("movie")?.count({ category: args.id }, {});

    if (moviesUsingCategory > 0) {
      throw this.createValidationException(
        "Cannot delete category as it is used by existing movies."
      );
    }

    await categoryRepo?.delete(args.id).catch((err) => {
      throw this.createServerErrorException(err);
    });

    return new Message("Category Deleted", 200);
  }
}
