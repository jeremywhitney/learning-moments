export const getAllPosts = async () => {
  const res = await fetch(`http://localhost:8088/posts`);
  return await res.json();
};

export const getPostById = async (postId) => {
  const res = await fetch(
    `http://localhost:8088/posts/${postId}?_embed=likes&_expand=user&_expand=topic`
  );
  return await res.json();
};

export const createPost = async (post) => {
  const res = await fetch(`http://localhost:8088/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json()
};

export const deletePost = async (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};

export const updatePost = async (postId, updatedPost) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
};

export const getPostsByUserId = async (userId) => {
  const res = await fetch(`http://localhost:8088/posts?userId=${userId}`);
  return await res.json();
};

