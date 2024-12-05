import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPosts } from "../components/posts/MyPosts";
import { Favorites } from "../components/posts/Favorites";
import { CreateNewPost } from "../components/forms/CreateNewPost";
import { EditPost } from "../components/forms/EditPost";
import { UserProfile } from "../components/users/UserProfile";
import { EditProfile } from "../components/users/EditProfile";
import { UserStorage } from "../types/users";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState<UserStorage | null>(null);

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    if (localLearningUser) {
      const learningUserObject = JSON.parse(localLearningUser);
      setCurrentUser(learningUserObject);
    }
  }, []);

  if (!currentUser) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts />} />
        <Route path="posts" element={<AllPosts />} />
        <Route
          path="posts/:postId"
          element={<PostDetails currentUser={currentUser} />}
        />
        <Route
          path="posts/edit/:postId"
          element={<EditPost currentUser={currentUser} />}
        />
        <Route path="myposts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route
          path="newpost"
          element={<CreateNewPost currentUser={currentUser} />}
        />
        <Route
          path="profile/:userId"
          element={<UserProfile currentUser={currentUser} />}
        />
        {/* Add currentUser prop back in if you ever end up building out this component */}
        <Route path="profile/edit/:userId" element={<EditProfile />} /> 
      </Route>
    </Routes>
  );
};