export default `
input CreateCategoryInput {
  name: String,
  description: String,
}

input UpdateCategoryInput {
  id: ID,
  name: String,
  description: String,
}
`;
