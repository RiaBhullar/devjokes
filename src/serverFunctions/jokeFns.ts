import { createServerFn } from "@tanstack/react-start";
import type { CreateJokeInput, DeleteJokeInput, VoteJokeInput } from "#/types";
// import { authClient } from "#/lib/auth-client"; 
import { auth } from "#/lib/auth";
import { getRequestHeaders } from "@tanstack/react-start/server"

export const getJokes = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    return context.jokeService.getJokes();
  },
);

export const createJoke = createServerFn({ method: "POST" })
  .inputValidator((input: CreateJokeInput) => input)
  .handler(async ({ data, context }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({headers})
    if (!session) throw new Error("unauthorized");
    
    return context.jokeService.createJoke({
      question: data.question,
      answer: data.answer,
      ownerId: session.user.id
    });
  });

export const voteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: VoteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({headers})
    if (!session) throw new Error("unauthorized");

    return context.jokeService.voteJoke({
      id: data.id,
      delta: data.delta,
      userId: session.user.id
    });
  });

export const deleteJoke = createServerFn({ method: "POST" })
  .inputValidator((input: DeleteJokeInput) => input)
  .handler(async ({ data, context }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({headers})
    if (!session) throw new Error("unauthorized");

    return context.jokeService.deleteJoke({
      id: data.id,
      userId: session.user.id
    });
  });
