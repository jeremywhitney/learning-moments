import { CompletePost, Post } from "../types/posts";

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await fetch(`http://localhost:8088/posts`);
  return await res.json();
};

export const getPostById = async (
  postId: number
): Promise<CompletePost | null> => {
  const res = await fetch(
    `http://localhost:8088/posts/${postId}?_embed=likes&_expand=user&_expand=topic`
  );
  return await res.json();
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const res = await fetch(`http://localhost:8088/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (postId: number): Promise<Response> => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = async (
  postId: number,
  updatedPost: Omit<Post, "id">
): Promise<Post> => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
};

export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  const res = await fetch(`http://localhost:8088/posts?userId=${userId}`);
  return await res.json();
};
