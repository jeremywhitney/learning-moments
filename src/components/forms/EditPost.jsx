import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postService";
import { PostForm } from "./PostForm";

export const EditPost = ({ currentUser }) => {
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getPostById(postId).then((post) => {
      setInitialData(post);
    });
  }, [postId]);

  const handleUpdatePost = (updatedPost) => {
    const editedPost = {
      userId: currentUser.id,
      topicId: parseInt(updatedPost.topicId),
      title: updatedPost.title,
      body: updatedPost.body,
      date: new Date().toISOString().split("T")[0],
    };
    return updatePost(postId, editedPost);
  };

  return initialData ? (
    <PostForm initialData={initialData} onSubmit={handleUpdatePost} />
  ) : (
    <div>Loading...</div>
  );
};
