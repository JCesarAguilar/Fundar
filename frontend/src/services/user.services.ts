import { IUser } from "@/interfaces/IUser";
import { IEditUserFormValues } from "@/validators/editUserSchema";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${apiURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`Error fetching users: ${errMsg}`);
    }
    const users: IUser[] = await res.json();
    return users;
  } catch (err) {
    console.error("Server error while getting users:", err);
    throw err;
  }
};

export const getUserById = async (token: string, userId: string) => {
  try {
    const res = await fetch(`${apiURL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error fetching user by id");
    const userInfo = res.json();
    return userInfo;
  } catch (err) {
    console.error("Server error getting detail from user");
    throw err;
  }
};

export const updateUser = async (
  idUser: string,
  userData: IEditUserFormValues,
  token: string
) => {
  try {
    const res = await fetch(`${apiURL}/users/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error updating user: ${errorText || res.statusText}`);
    }
    const updatedUser = await res.json();
    return updatedUser;
  } catch (err) {
    console.error("Server error while updating user:", err);
    throw err;
  }
};

export const deleteUser = async (token: string, idUser: string) => {
  try {
    const res = await fetch(`${apiURL}/users/${idUser}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error deleting user: ${errorText || res.statusText} `);
    }
    const deletedUser = await res.json();
    return deletedUser;
  } catch (err) {
    console.error("Server error while deleting user:", err);
    throw err;
  }
};

export const updateUserRole = async (
  token: string,
  idUser: string,
  role: "admin" | "user"
) => {
  try {
    const res = await fetch(`${apiURL}/users/${idUser}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error("Error updating user role");
    const updatedUserRole = await res.json();
    return updatedUserRole;
  } catch (err) {
    console.error("Server error while updating role user:", err);
    throw err;
  }
};
