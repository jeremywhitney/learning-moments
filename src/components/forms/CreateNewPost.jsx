import { createPost } from "../../services/postService";
import { PostForm } from "./PostForm";

export const CreateNewPost = ({ currentUser }) => {
  const handleCreateNewPost = (newPost) => {
    const postWithUser = {
      userId: currentUser.id,
      topicId: parseInt(newPost.topicId),
      title: newPost.title,
      body: newPost.body,
      date: new Date().toISOString().split("T")[0],
    };
    return createPost(postWithUser);
  };

  return <PostForm initialData={{}} onSubmit={handleCreateNewPost} />;
};
