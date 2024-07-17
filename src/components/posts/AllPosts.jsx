import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { getAllTopics } from "../../services/topicService";
import { getAllLikes } from "../../services/likeService";
import { Post } from "./Post";
import { PostFilterBar } from "./PostFilterBar";
import "./Posts.css";
import { Link } from "react-router-dom";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    // Fetch all data and set state
    Promise.all([getAllPosts(), getAllTopics(), getAllLikes()]) // Promise.all takes an array of promises and returns a single promise that resolves when all promises have been resolved.
      .then(([posts, topics, likes]) => {
        // Runs when the promises resolve. Receives an array with resolved values of input promises.
        // Sets the state variables with fetched data and initializes with fetched posts
        setAllPosts(posts);
        setAllTopics(topics);
        setAllLikes(likes);
        setFilteredPosts(posts);
      });
  }, []);

  const getTopicNameById = (id) => {
    const topic = allTopics.find((t) => t.id === id);
    return topic ? topic.name : "Unknown Topic";
  };

  const getLikeCountByPostId = (postId) => {
    return allLikes.filter((l) => l.postId === postId).length;
  };

  useEffect(() => {
    const foundPosts = allPosts.filter((post) => {
      const matchesTitle = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopic
        ? post.topicId === parseInt(selectedTopic)
        : true;
      return matchesTitle && matchesTopic;
    });
    setFilteredPosts(foundPosts);
  }, [searchTerm, selectedTopic, allPosts]);

  return (
    <>
      <h2>ALL POSTS</h2>
      <PostFilterBar
        allTopics={allTopics}
        setSelectedTopic={setSelectedTopic}
        setSearchTerm={setSearchTerm}
      />
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              topic={getTopicNameById(post.topicId)}
              likes={getLikeCountByPostId(post.id)}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
