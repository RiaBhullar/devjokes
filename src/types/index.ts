// import type { CommentRow, JokeRow } from "#/server/db/schema";
import type { CommentRow, JokeRow } from "#/dal/db/schema";

export type Joke = Pick<JokeRow, "id" | "question" | "answer" | "score" | "joke_creator"> & {
  comments: CommentRow["body"][];
};

export interface CreateJokeInput {
  question: Joke["question"];
  answer: Joke["answer"];
  ownerId: string;
}

export interface VoteJokeInput {
  id: Joke["id"];
  delta: 1 | -1;
  userId: string;
}

export interface DeleteJokeInput {
  id: Joke["id"];
  userId: string;
}
