import { EFilterOptions } from "@storexweb/kernel";

export const movieFilters = {
  name: {
    field: "name",
    options: [EFilterOptions.IS, EFilterOptions.LIKE],
  },
  releaseDate: {
    field: "releaseDate",
    options: [
      EFilterOptions.IS,
      EFilterOptions.GREATER_THAN,
      EFilterOptions.LESS_THAN,
      EFilterOptions.GREATER_THAN_OR_EQ,
      EFilterOptions.LESS_THAN_OR_EQ,
    ],
    parseValue: (value: string) => new Date(value),
  },
  cast: {
    field: "cast",
    options: [EFilterOptions.IN, EFilterOptions.NIN],
  },
  category: {
    field: "category",
    options: [EFilterOptions.IS, EFilterOptions.LIKE],
  },
};
