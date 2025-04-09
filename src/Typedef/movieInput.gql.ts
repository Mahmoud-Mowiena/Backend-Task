export default `
input CreateMovieInput {
  _id: ID,
  name: String,
  releaseDate: Date,
  cast: [String],
  category: String,
}

input UpdateMovieInput {
  _id: ID,
  name: String,
  releaseDate: Date,
  cast: [String],
  category: String,
}
`;
