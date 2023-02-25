import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import { MyContext } from "../utils/type";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { em }: MyContext): Promise<User[]> {
    const newEm = em.fork();
    return await newEm.find(User, {});
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext,
  ): Promise<User | null> {
    const newEm = em.fork();
    return newEm.findOne(User, { id });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("phone") phone: string,
    @Ctx() { em }: MyContext,
  ): Promise<User> {
    const newEm = em.fork();
    const user = newEm.create(User, { firstName, lastName, email, phone });
    newEm.persist(user);
    newEm.flush();
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("firstName", { nullable: true }) firstName: string,
    @Arg("lastName", { nullable: true }) lastName: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("phone", { nullable: true }) phone: string,
    @Ctx() { em }: MyContext,
  ) {
    const newEm = em.fork();
    const user = await newEm.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    await newEm.persistAndFlush(user);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number, @Ctx() { em }: MyContext) {
    const newEm = em.fork();
    await newEm.nativeDelete(User, { id });
    return true;
  }
}
