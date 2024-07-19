import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { addLike, deleteLike } from "../../services/likeService";
import { useLikes } from "../utilities/useLikes";
import "./Posts.css";

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({}); // State to hold the post details
  const [userLiked, setUserLiked] = useState(false); // State to track if the current user has liked the post
  const [likeId, setLikeId] = useState(null); // State to store the ID of the user's like
  const { postId } = useParams(); // Retrieve postId from URL parameters
  const navigate = useNavigate(); // Function to programmatically navigate to other routes
  const userLikes = useLikes(currentUser.id); // Fetch user's likes using custom hook

  // Fetch the post details and update state when postId, currentUser.id, or userLikes change
  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj); // Update post state with fetched post data
      const userLike = postObj.likes?.find(
        (like) => like.userId === currentUser.id
      );
      setUserLiked(!!userLike); // Set userLiked to true if a like is found, otherwise false
      setLikeId(userLike ? userLike.id : null); // Set likeId if a like exists
    });
  }, [postId, currentUser.id, userLikes]); // Dependencies that trigger the useEffect

  const isAuthor = post.userId === currentUser.id; // Check if the current user is the author of the post

  // Function to add a like to the post
  const handleAddLike = async () => {
    const like = {
      userId: currentUser.id,
      postId: post.id,
    };
    try {
      const newLike = await addLike(like); // Add the like to the database
      // Update the post state with the new like
      setPost((prevPost) => ({
        ...prevPost,
        likes: [...prevPost.likes, newLike],
      }));
      setUserLiked(true); // Set userLiked to true
      setLikeId(newLike.id); // Store the new like's ID
    } catch (error) {
      console.error("Error adding like:", error); // Log any errors
    }
  };

  // Function to remove a like from the post
  const handleRemoveLike = async () => {
    if (likeId) {
      try {
        await deleteLike(likeId); // Remove the like from the database
        // Update the post state by filtering out the removed like
        setPost((prevPost) => ({
          ...prevPost,
          likes: prevPost.likes.filter((like) => like.id !== likeId),
        }));
        setUserLiked(false); // Set userLiked to false
        setLikeId(null); // Clear the stored like ID
      } catch (error) {
        console.error("Error removing like:", error); // Log any errors
      }
    }
  };

  // Function to add a like and then navigate to the favorites view
  const handleAddLikeAndNavigate = () => {
    handleAddLike().then(() => {
      navigate(`/favorites`); // Navigate to the favorites page after adding a like
    });
  };

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
          onClick={() => navigate(`/posts/edit/${post.id}`)}
        >
          Edit Post
        </button>
      ) : userLiked ? (
        <button className="unlike-button" onClick={handleRemoveLike}>
          Unlike
        </button>
      ) : (
        <button className="like-button" onClick={handleAddLikeAndNavigate}>
          Like
        </button>
      )}
    </section>
  );
};
