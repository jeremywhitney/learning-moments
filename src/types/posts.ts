import { Like } from "./likes";
import { Topic } from "./topics";
import { User } from "./users";

export interface Post {
  id: number;
  userId: number;
  topicId: number;
  title: string;
  body: string;
  date: string;
}

export interface CompletePost extends Post {
  likes: Like[];
  user: User;
  topic: Topic;
}

export type PostFormData = Pick<Post, 'title' | 'body'> & { topicId: string}

export type PostData = Post
