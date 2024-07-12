export const getAllPosts = async () => {
  const res = await fetch(`http://localhost:8088/posts`);
  return await res.json();
};