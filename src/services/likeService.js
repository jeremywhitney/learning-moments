export const getAllLikes = async () => {
  const res = await fetch(`http://localhost:8088/likes`);
  return await res.json();
};

export const getLikesByUserId = async (userId) => {
  const res = await fetch(
    `http://localhost:8088/likes/?userId=${userId}&_expand=post`
  );
  return await res.json();
};

export const deleteLike = async (likeId) => {
  return fetch(`http://localhost:8088/likes/${likeId}`, {
    method: "DELETE",
  });
};

export const addLike = async (like) => {
  const res = await fetch(`http://localhost:8088/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
  return res.json();
};
