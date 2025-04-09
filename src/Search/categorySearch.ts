import { ISearchDef } from "@storexweb/kernel";

export const categorySearch: ISearchDef = {
  name: {
    field: ["$name"],
  },
};
