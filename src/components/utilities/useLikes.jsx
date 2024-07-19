import { useEffect, useState } from "react";
import { getLikesByUserId } from "../../services/likeService";

export const useLikes = (userId, refresh) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchedLikes = await getLikesByUserId(userId);
        setLikes(fetchedLikes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [userId, refresh]);
  return likes;
};
