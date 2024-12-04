import { Link, useNavigate } from "react-router-dom";
import { UserStorage } from "../../types/users";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem("learning_user");
  const currentUser = userJSON ? (JSON.parse(userJSON) as UserStorage) : null;

  if (!currentUser) return null;

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/posts">All Posts</Link>
      </li>
      <li className="navbar-item">
        <Link to="/myposts">My Posts</Link>
      </li>
      <li className="navbar-item">
        <Link to="/favorites">Favorites</Link>
      </li>
      <li className="navbar-item">
        <Link to="/newpost">New Post</Link>
      </li>
      <li className="navbar-item">
        <Link to={`/profile/${currentUser.id}`}>Profile</Link>
      </li>
      {currentUser && (
        <li className="navbar-item navbar-logout">
          <Link
            to="navbar-link"
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};
