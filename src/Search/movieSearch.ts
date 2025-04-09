import { ISearchDef } from "@storexweb/kernel";

export const movieSearch: ISearchDef = {
  name: {
    field: ["$name"],
  },
};
