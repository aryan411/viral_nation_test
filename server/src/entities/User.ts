import { Property } from "@mikro-orm/core";
import { OneToMany } from "@mikro-orm/core";
import { PrimaryKey } from "@mikro-orm/core";
import { Entity } from "@mikro-orm/core";
import { Note } from "./Note";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity({tableName:'users'})
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  firstName!: string;

  @Field()
  @Property()
  lastName!: string;

  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  phone!: string;

  @Field(() => String)
  @Property({ onCreate: () => new Date() })
  createdDate!: Date;

//   @Field(() => [Note])
//   @OneToMany(() => Note, (note) => note.user)
//   notes = new Set<Note>();
}
