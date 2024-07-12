import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { getAllTopics } from "../../services/topicService";
import { getAllLikes } from "../../services/likeService";
import { Post } from "./Post";
import "./Posts.css";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  useEffect(() => {
    getAllPosts().then(setAllPosts);
    getAllTopics().then(setAllTopics);
    getAllLikes().then(setAllLikes);
  }, []);

  const getTopicNameById = (id) => {
    const topic = allTopics.find((t) => t.id === id);
    return topic ? topic.name : "Unknown Topic";
  };

  const getLikeCountByPostId = (postId) => {
    return allLikes.filter((l) => l.postId === postId).length;
  };

  return (
    <>
      <h2>ALL POSTS</h2>
      <div className="posts-container">
        {allPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            topic={getTopicNameById(post.topicId)}
            likes={getLikeCountByPostId(post.id)}
          />
        ))}
      </div>
    </>
  );
};
