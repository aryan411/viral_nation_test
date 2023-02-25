import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import { MyContext } from "../utils/type";

@Resolver(Note)
export class NoteResolver {
  constructor() {}
  @Query(() => [Note])
  async notes(
    @Arg("userId", { nullable: true }) userId: number,
    @Ctx() { em }: MyContext,
  ) {
    const newEm = em.fork();
    if (userId) return newEm.find(Note, { user: userId });
    return newEm.find(Note, {});
  }
  @Query(() => Note, { nullable: true })
  async note(@Arg("id") id: number, @Ctx() { em }: MyContext) {
    const newEm = em.fork();
    return newEm.findOne(Note, { id });
  }

  @Mutation(() => Note)
  async createNote(
    @Arg("text") text: string,
    @Arg("priority") priority: number,
    @Arg("userId") userId: number,
    @Ctx() { em }: MyContext,
  ) {
    const newEm = em.fork();
    const user = await newEm.findOne(User, { id: userId });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const note = new Note();
    note.text = text;
    note.priority = priority;
    note.user = user;
    newEm.persist(note);
    await newEm.flush();
    return note;
  }

  @Mutation(() => Note, { nullable: true })
  async updateNote(
    @Arg("id") id: number,
    @Arg("text", { nullable: true }) text: string,
    @Arg("priority", { nullable: true }) priority: number,
    @Ctx() { em }: MyContext,
  ) {
    const newEm = em.fork();
    const note = await newEm.findOne(Note, { id });
    if (!note) {
      return null;
    }
    if (text) {
      note.text = text;
    }
    if (priority) {
      note.priority = priority;
    }
    await newEm.flush();
    return note;
  }

  @Mutation(() => Boolean)
  async deleteNote(@Arg("id") id: number, @Ctx() { em }: MyContext) {
    const newEm = em.fork();
    await newEm.nativeDelete(Note, { id });
    return true;
  }
}
