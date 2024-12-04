import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/postService";
import { PostForm } from "./PostForm";
import { User } from "../../types/users";
import { Post, PostFormData } from "../../types/posts";

interface EditPostProps {
  currentUser: Pick<User, "id">;
}

export const EditPost = ({ currentUser }: EditPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) return <div>Post not found</div>;

  const [initialData, setInitialData] = useState<Partial<Post | null>>(null);

  useEffect(() => {
    getPostById(parseInt(postId, 10)).then((post) => {
      setInitialData(post);
    });
  }, [postId]);

  const handleUpdatePost = (updatedPost: PostFormData) => {
    const editedPost = {
      userId: currentUser.id,
      topicId: parseInt(updatedPost.topicId),
      title: updatedPost.title,
      body: updatedPost.body,
      date: new Date().toISOString().split("T")[0],
    };
    return updatePost(parseInt(postId, 10), editedPost);
  };

  return initialData ? (
    <PostForm initialData={initialData} onSubmit={handleUpdatePost} />
  ) : (
    <div>Loading...</div>
  );
};
