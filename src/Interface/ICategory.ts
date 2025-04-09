import { ISchemaID } from "@storexweb/kernel";

export default interface ICategory {
  id: ISchemaID;
  name: string;
  description?: string;
}
