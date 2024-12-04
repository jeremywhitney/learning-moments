import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { User } from "../../types/users";
import "./Login.css";

type RegistrationUser = Omit<User, "id" | "cohort"> & { cohort: string };

export const Register = () => {
  const [user, setUser] = useState<RegistrationUser>({
    name: "",
    email: "",
    cohort: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
          } as Pick<User, "id">)
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt: ChangeEvent<HTMLInputElement>) => {
    const copy = { ...user };
    copy[evt.target.id as keyof typeof user] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Learning Moments</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="number"
              id="cohort"
              className="auth-form-input"
              placeholder="Cohort #"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
