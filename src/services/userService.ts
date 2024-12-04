import { User } from "../types/users";

export const getUserByEmail = async (email: string): Promise<User[]> => {
  const res = await fetch(`http://localhost:8088/users?email=${email}`);
  return await res.json();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export const getUserById = async (userId: number): Promise<User> => {
  const res = await fetch(`http://localhost:8088/users/${userId}`);
  return await res.json();
};

export const editUser = async (
  userId: number,
  user: Omit<User, "id">
): Promise<User> => {
  const res = await fetch(`http://localhost:8088/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};
