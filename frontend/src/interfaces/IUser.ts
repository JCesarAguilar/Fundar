import { IProject } from "./IProject";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  city?: string;
  phone?: string;
  birthDate?: string | Date;
  address?: string;
  imageUrl?: string;
  role: "admin" | "user";
  donations: IUserDonation[];
}

export interface IUserDonation {
  id: string;
  amount: number;
  date: string;
  paymentMethod: string;
  project: IProject;
}
