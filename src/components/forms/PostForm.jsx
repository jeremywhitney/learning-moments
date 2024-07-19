import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTopics } from "../../services/topicService";
import "./Form.css";

export const PostForm = ({ initialData, onSubmit }) => {
  const [post, setPost] = useState({
    topicId: "",
    title: "",
    body: "",
    ...initialData,
  });
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    if (post.title && post.topicId && post.body) {
      onSubmit(post).then(() => {
        navigate("/myposts");
      });
    } else {
      window.alert("Please fill out all fields before submitting");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <form className="post-form">
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
        <button type="submit" onClick={handleSave}>
          Save Post
        </button>
      </form>
    </div>
  );
};
