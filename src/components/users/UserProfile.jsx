import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../services/userService";
import { getPostsByUserId } from "../../services/postService";
import "./Users.css";

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [postsCount, setPostsCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [editableCohort, setEditableCohort] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const userObj = await getUserById(userId);
      setUser(userObj);
      setEditableName(userObj.name);
      setEditableCohort(userObj.cohort);

      const posts = await getPostsByUserId(userId);
      setPostsCount(posts.length);
    };
    fetchUserData();
  }, [userId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e) => setEditableName(e.target.value);
  const handleCohortChange = (e) => setEditableCohort(e.target.value);

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      name: editableName,
      cohort: parseInt(editableCohort),
    };
    await editUser(userId, updatedUser);
    setUser(updatedUser);
    setIsEditMode(false);
  };

  return (
    <section className="user-profile">
      <header className="user-profile-header">VIEW PROFILE</header>
      <div className="user-name">
        {isEditMode ? (
          <input type="text" value={editableName} onChange={handleNameChange} />
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div className="user-cohort">
        {isEditMode ? (
          <input
            type="text"
            value={editableCohort}
            onChange={handleCohortChange}
          />
        ) : (
          <span>Cohort {user.cohort}</span>
        )}
      </div>
      <div className="posts-written">
        <span>Posts Written: {postsCount}</span>
      </div>
      {currentUser.id === user.id && (
        <div>
          {isEditMode ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={toggleEditMode}>
              Edit Profile
            </button>
          )}
        </div>
      )}
    </section>
  );
};
