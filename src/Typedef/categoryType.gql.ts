export default `
  type Category @key(fields: "id") {
    id: ID
    name: String
    description: String
  }

  type CategoryMutationResultType {
    data: Category
    code: Int
    text: String
  }

  type CategoryListingType {
    data: [Category]
    pagination: PaginationType
  }

  extend type Query {
    category(id: ID!): Category
    categories(listing: ListingInput): CategoryListingType
  }

  extend type Mutation {
    createCategory(category: CreateCategoryInput): CategoryMutationResultType
    updateCategory(category: UpdateCategoryInput): CategoryMutationResultType
    deleteCategory(id: ID): Message
  }
`;
