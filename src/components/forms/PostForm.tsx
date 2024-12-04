import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTopics } from "../../services/topicService";
import { Post, PostFormData } from "../../types/posts";
import { Topic } from "../../types/topics";
import "./Form.css";

interface PostFormProps {
  initialData: Partial<Post>;
  onSubmit: (post: PostFormData) => Promise<Post>;
}

export const PostForm = ({ initialData, onSubmit }: PostFormProps) => {
  const [post, setPost] = useState<PostFormData>({
    topicId: initialData.topicId?.toString() || "",
    title: initialData.title || "",
    body: initialData.body || "",
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (post.title && post.topicId && post.body) {
      onSubmit(post).then(() => {
        navigate("/myposts");
      });
    } else {
      window.alert("Please fill out all fields before submitting");
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <form className="post-form" onSubmit={handleSave}>
        <h2 className="form-header">
          {initialData.id ? "EDIT POST" : "NEW POST"}
        </h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="topicId">Topic</label>
            <select
              id="topicId"
              name="topicId"
              value={post.topicId}
              onChange={handleChange}
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="body">Post Body</label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button type="submit">Save Post</button>
      </form>
    </div>
  );
};
