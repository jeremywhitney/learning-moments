import { Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/posts/AllPosts";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AllPosts />} />
      </Route>
    </Routes>
  );
};
