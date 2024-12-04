export interface User {
  id: number;
  name: string;
  email: string;
  cohort: number;
}

export type UserStorage = Pick<User, "id">;