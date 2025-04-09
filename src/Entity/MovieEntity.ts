import { Schema, BaseEntity } from "@storexweb/kernel";

const categorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
});

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    releaseDate: { type: Date, default: null },
    cast: {
      type: [String],
      default: [],
    },
    category: {
      type: categorySchema,
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
