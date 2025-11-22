export interface IUserSession {
  token: string;
  user: IUserData;
}

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  country: string;
  role: "admin" | "user";
}
