import { Property } from "@mikro-orm/core";
import { ManyToOne } from "@mikro-orm/core";
import { PrimaryKey } from "@mikro-orm/core";
import { Entity } from "@mikro-orm/core";
import { User } from "./User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity({ tableName: "notes" })
export class Note {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  text!: string;

  @Field()
  @Property({ type: "date", default: Date.now() })
  createdDate!: Date;

  @Field()
  @Property({ default: Date.now(), onUpdate: () => new Date() })
  updatedDate!: Date;

  @Field()
  @Property()
  priority!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;
}
