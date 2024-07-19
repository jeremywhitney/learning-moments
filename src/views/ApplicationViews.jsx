import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/posts/AllPosts";
import { NavBar } from "../components/nav/NavBar";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPosts } from "../components/posts/MyPosts";
import { CreateNewPost } from "../components/forms/CreateNewPost";
import { EditPost } from "../components/forms/EditPost";
import { Favorites } from "../components/posts/Favorites";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

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
        <Route index element={<AllPosts currentUser={currentUser} />} />
        <Route path="posts" element={<AllPosts currentUser={currentUser} />} />
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
      </Route>
    </Routes>
  );
};
