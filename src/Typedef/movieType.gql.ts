export default `
  type Movie @key(fields: "id") {
    id: ID
    name: String
    releaseDate: Date
    cast: [String]
    category: Category
  }

  type MovieMutationResultType {
    data: Movie
    code: Int
    text: String
  }

  type MovieListingType {
    data: [Movie]
    pagination: PaginationType
  }

  extend type Query {
    movie(id: ID!): Movie
    movies(listing: ListingInput): MovieListingType
  }

  extend type Mutation {
    createMovie(movie: CreateMovieInput): MovieMutationResultType
    updateMovie(movie: UpdateMovieInput): MovieMutationResultType
    deleteMovie(id: ID): Message
  }
`;
