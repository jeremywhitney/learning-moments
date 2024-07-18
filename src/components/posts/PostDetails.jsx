import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import "./Posts.css";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

  const isAuthor = post.userId === currentUser.id;

  return (
    <section className="post-details">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-info">
        <h3 className="post-user">
          Author: {post.user?.name || "Unknown User"}
        </h3>
        <span className="post-likes">{post.likes?.length || 0} Likes</span>
      </div>
      <p className="post-topic">Topic: {post.topic?.name}</p>
      <p className="post-date">
        Date: {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="post-body">{post.body}</p>
      {isAuthor ? (
        <button
          className="edit-button"
          onClick={() => navigate(`posts/edit/${post.id}`)}
        >
          Edit Post
        </button>
      ) : (
        <button className="like-button">Like</button>
      )}
    </section>
  );
};
