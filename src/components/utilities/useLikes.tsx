import { useEffect, useState } from "react";
import { getLikesByUserId } from "../../services/likeService";
import { LikeWithPostObject } from "../../types/likes";

export const useLikes = (
  userId: number,
  refresh: boolean
): LikeWithPostObject[] => {
  const [likes, setLikes] = useState<LikeWithPostObject[]>([]);

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
