"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PATHROUTES } from "@/helpers/NavItems";
import { IUserSession } from "@/interfaces/IUserSession";
import { useRouter } from "next/navigation";

//Defino Interfaz que define los valores
interface AuthContextProps {
  dataUser: IUserSession | null;
  setDataUser: (dataUser: IUserSession | null) => void;
  logout: () => void;
  isLoading: boolean;
  updateUserProfile: (updatedData: Partial<IUserSession["user"]>) => void;
}

//Esto si es la creacion del context y la definicion de sus valores iniciales
const AuthContext = createContext<AuthContextProps>({
  dataUser: null,
  setDataUser: () => {},
  logout: () => {},
  isLoading: true,
  updateUserProfile: () => {},
});

//Interfaz del AuthProvider
interface AuthProviderProps {
  children: React.ReactElement;
}

//Crear nuestro componente de AuthProvider, encargado de manejar estados, etc
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<IUserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Lógica que controlaré con useEffect (1 o 2 )
  // Guarda cambios en localStorage cuando cambia el usuario
  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const dataUser = localStorage.getItem("userSession");
      if (dataUser) {
        setDataUser(JSON.parse(dataUser));
      } else {
        setDataUser(null);
      }
      setIsLoading(false);
    }
  }, []);

  //Métodos disponibles
  const logout = () => {
    setDataUser(null);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; max-age=0";
    }
    router.push(PATHROUTES.HOME);
  };

  // Actualiza la data del usuario logueado y sincroniza el storage
  const updateUserProfile = (updatedData: Partial<IUserSession["user"]>) => {
    if (!dataUser) return;

    const newUserSession: IUserSession = {
      ...dataUser,
      user: {
        ...dataUser.user,
        ...updatedData,
        imageUrl: updatedData.imageUrl ?? dataUser.user.imageUrl,
      },
    };
    setDataUser(newUserSession);
    localStorage.setItem("userSession", JSON.stringify(newUserSession));
  };

  return (
    <AuthContext.Provider
      value={{
        dataUser,
        setDataUser,
        logout,
        isLoading,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
