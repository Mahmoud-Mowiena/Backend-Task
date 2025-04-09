export default `
input CreateMovieInput {
  name: String,
  releaseDate: Date,
  cast: [String],
  category: ID,
}

input UpdateMovieInput {
  id: ID,
  name: String,
  releaseDate: Date,
  cast: [String],
  category: ID,
}
`;
