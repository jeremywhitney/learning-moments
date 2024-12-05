import { createPost } from "../../services/postService";
import { Post, PostFormData } from "../../types/posts";
import { User } from "../../types/users";
import { PostForm } from "./PostForm";

interface CreateNewPostFormProps {
  currentUser: Pick<User, "id">;
}

export const CreateNewPost = ({ currentUser }: CreateNewPostFormProps) => {
  const handleCreateNewPost = (newPost: PostFormData) => {
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
