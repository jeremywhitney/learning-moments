import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { getPostsByUserId } from "../../services/postService";
import "./Users.css";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [postsCount, setPostsCount] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const userObj = await getUserById(userId);
      setUser(userObj);

      const posts = await getPostsByUserId(userId);
      setPostsCount(posts.length);
    };
    fetchUserData();
  }, [userId]);

  return (
    <section className="user-profile">
      <header className="user-profile-header">VIEW PROFILE</header>
      <div className="user-name">
        <span>{user.name}</span>
      </div>
      <div className="user-cohort">
        <span>Cohort {user.cohort}</span>
      </div>
      <div className="posts-written">
        <span>Posts Written: {postsCount}</span>
      </div>
      {currentUser.id === user.id && (
        <button className="edit-button">Edit Profile</button>
      )}
    </section>
  );
};
