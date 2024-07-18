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
  const res = await fetch(`http://localhost:8088/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};
