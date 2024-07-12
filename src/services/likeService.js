export const getAllLikes = async () => {
    const res = await fetch(`http://localhost:8088/likes`);
    return await res.json();
  };