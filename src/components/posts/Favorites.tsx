import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteLike } from "../../services/likeService";
import { useLikes } from "../utilities/useLikes";
import { User } from "../../types/users";
import "./Posts.css";

interface FavoritesProps {
  currentUser: Pick<User, "id">;
}

export const Favorites = ({ currentUser }: FavoritesProps) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const myLikes = useLikes(currentUser.id, refresh);

  const handleDelete = (likeId: number) => {
    deleteLike(likeId).then(() => {
      setRefresh((prev) => !prev);
    });
  };

  return (
    <section className="my-posts-container">
      <h2>FAVORITES</h2>
      {myLikes.map((like) => (
        <div className="post-item" key={like.id}>
          <Link to={`/posts/${like.post.id}`}>
            <h3 className="my-post-post-title">{like.post.title}</h3>
          </Link>
          <div className="post-actions">
            <button
              className="unlike-button"
              onClick={() => handleDelete(like.id)}
            >
              Unlike
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
