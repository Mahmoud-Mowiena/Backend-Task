import { Schema, BaseEntity } from "@storexweb/kernel";

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, default: null },
    cast: {
      type: [String],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default class MovieEntity extends BaseEntity {
  public schema: Schema = movieSchema;
}
