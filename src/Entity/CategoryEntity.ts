import { Schema, BaseEntity } from "@storexweb/kernel";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
  }, {
    timestamps: true,
  });

  export default class CategoryEntity extends BaseEntity {
    public schema: Schema = categorySchema;
  }