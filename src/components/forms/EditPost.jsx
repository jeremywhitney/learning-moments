import { useEffect } from "react";
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
    return updatePost(postId, updatedPost);
  };

  return initialData ? (
    <PostForm initialData={initialData} onSubmit={handleUpdatePost} />
  ) : (
    <div>Loading...</div>
  );
};
