export const Post = ({ title, topic, likes }) => {
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>Topic: {topic}</p>
      <p>Likes: {likes}</p>
    </div>
  );
};
