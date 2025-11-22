"use client";

import { IUser } from "@/interfaces/IUser";
import { getAllUsers } from "@/services/user.services";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

//Defino Interfaz que define los valores
interface UserContextProps {
  allUsers: IUser[];
  totalUsers: number;
  refreshUsers: () => void;
  loading: boolean;
}

//Esto si es la creacion del context y la definicion de sus valores iniciales
const UsersContext = createContext<UserContextProps>({
  allUsers: [],
  totalUsers: 0,
  refreshUsers: async () => {},
  loading: false,
});

//Defino Interfaz de UserProvider
interface UserProviderProps {
  children: React.ReactElement;
}

//Crear nuestro componente de UserProvider, encargado de manejar estados, etc
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  //Métodos disponibles
  const refreshUsers = async () => {
    try {
      setLoading(true);
      const users = await getAllUsers(token);
      setAllUsers(users);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = allUsers.length;

  //Lógica que controlaré con useEffect (1 o 2 )
  useEffect(() => {
    if (dataUser?.token) {
      refreshUsers();
    }
  }, [dataUser]);
  return (
    <UsersContext.Provider
      value={{ allUsers, totalUsers, refreshUsers, loading }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
