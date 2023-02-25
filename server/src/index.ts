import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import mikroOrmConfig from "./mikro-orm.config";
import { UserResolver } from "./resolvers/UserResolver";
import { NoteResolver } from "./resolvers/NoteResolver";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, NoteResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(
      "Server started on http://localhost:4000 \n before staring Server create table Using given SQL Querie \n please check index.ts",
    );
  });
};

//  to create Tables
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   phone VARCHAR(255) NOT NULL,
//   created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE notes (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL,
//   created_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   updated_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   priority INT NOT NULL,
//   user_id INT REFERENCES users(id) ON DELETE CASCADE
// );

main();
