import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editUser, getUserById } from "../../services/userService";
import { getPostsByUserId } from "../../services/postService";
import { User } from "../../types/users";
import "./Users.css";

interface UserProfileProps {
  currentUser: Pick<User, "id">;
}

export const UserProfile = ({ currentUser }: UserProfileProps) => {
  const { userId } = useParams<{ userId: string }>();
  if (!userId) return null;
  const numericUserId = parseInt(userId, 10);

  const [user, setUser] = useState<User | null>(null);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editableName, setEditableName] = useState<string>("");
  const [editableCohort, setEditableCohort] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userObj = await getUserById(numericUserId);
      if (!userObj) return;
      setUser(userObj);
      setEditableName(userObj.name);
      setEditableCohort(userObj.cohort.toString());

      const posts = await getPostsByUserId(numericUserId);
      setPostsCount(posts.length);
    };
    fetchUserData();
  }, [userId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditableName(e.target.value);
  const handleCohortChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditableCohort(e.target.value);

  const handleSave = async () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      name: editableName,
      cohort: parseInt(editableCohort),
    };
    await editUser(numericUserId, updatedUser);
    setUser(updatedUser);
    setIsEditMode(false);
  };

  return (
    <section className="user-profile">
      <header className="user-profile-header">VIEW PROFILE</header>
      {user ? (
        <>
          <div className="user-name">
            {isEditMode ? (
              <input
                type="text"
                value={editableName}
                onChange={handleNameChange}
              />
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};