import { ISchemaID } from "@storexweb/kernel";

export default interface IMovie {
  id: ISchemaID;
  name: string;
  releaseDate: Date;
  cast: string[];
  category: ISchemaID;
}
