import { Post } from "./posts";

export interface Like {
  id: number;
  userId: number;
  postId: number;
}

export interface LikeWithPostObject extends Like {
  post: Post;
}
