import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";

export const MyPosts = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      const userPosts = allPosts.filter((p) => p.userId === currentUser.id);
      setMyPosts(userPosts);
    });
  }, [currentUser.id]);

  const handleDelete = (postId) => {
    deletePost(postId).then(() => {
      setMyPosts(myPosts.filter((p) => p.id !== postId));
    });
  };

  return (
    <section className="my-posts-container">
      <h2>MY POSTS</h2>
      {myPosts.map((post) => (
        <div className="post-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3 className="my-post-post-title">{post.title}</h3>
          </Link>
          <div className="post-actions">
            <button
              className="delete-button"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
