import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import { User, UserStorage } from "../../types/users";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUsers = await getUserByEmail(email);
    if (foundUsers.length === 1) {
      const user: User = foundUsers[0];

      localStorage.setItem(
        "learning_user",
        JSON.stringify({
          id: user.id,
        } as UserStorage)
      );

      navigate("/");
    } else {
      window.alert("Invalid login");
    }
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Learning Moments</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
