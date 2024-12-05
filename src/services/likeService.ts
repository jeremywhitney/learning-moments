import { Like, LikeWithPostObject } from "../types/likes";

export const getAllLikes = async (): Promise<Like[]> => {
  const res = await fetch(`http://localhost:8088/likes`);
  return await res.json();
};

export const getLikesByUserId = async (
  userId: number
): Promise<LikeWithPostObject[]> => {
  const res = await fetch(
    `http://localhost:8088/likes/?userId=${userId}&_expand=post`
  );
  return await res.json();
};

export const deleteLike = async (likeId: number): Promise<Response> => {
  return fetch(`http://localhost:8088/likes/${likeId}`, {
    method: "DELETE",
  });
};

export const addLike = async (like: Omit<Like, "id">): Promise<Like> => {
  const res = await fetch(`http://localhost:8088/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
  return res.json();
};
