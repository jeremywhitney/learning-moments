import { deleteLike } from "../../services/likeService";
import { Link } from "react-router-dom";
import { useLikes } from "../utilities/useLikes";
import { useState } from "react";
import "./Posts.css";

export const Favorites = ({ currentUser }) => {
  const [refresh, setRefresh] = useState(false);
  const myLikes = useLikes(currentUser.id, refresh);

  const handleDelete = (likeId) => {
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
