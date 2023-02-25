import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";
import { Note } from "./entities/Note";
import { __prod__ } from "./utils/constant";

export default {
  entities: [User, Note],
  dbName: "viral_nation",
  password:"Aryan@411",
  type: "postgresql",
  debug: __prod__,
} as Parameters<typeof MikroORM.init>[0];
