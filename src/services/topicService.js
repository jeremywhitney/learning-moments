export const getAllTopics = async () => {
  const res = await fetch(`http://localhost:8088/topics`);
  return await res.json();
};
