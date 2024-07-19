import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("learning_user"));

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
      {localStorage.getItem("learning_user") ? (
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
      ) : (
        ""
      )}
    </ul>
  );
};
