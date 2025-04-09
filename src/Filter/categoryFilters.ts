import { EFilterOptions } from "@storexweb/kernel";

export const categoryFilters = {
  name: {
    field: "name",
    options: [EFilterOptions.IS, EFilterOptions.LIKE],
  },
  description: {
    field: "description",
    options: [EFilterOptions.IS, EFilterOptions.LIKE],
  },
};
