"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PATHROUTES } from "@/helpers/NavItems";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "@/services/user.services";

interface JwtPayload {
  id: string;
  firstname: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  role: "user" | "admin";
}

export default function GoogleSuccessPage() {
  const router = useRouter();
  const { setDataUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      router.push(PATHROUTES.LOGIN);
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    const fetchUser = async () => {
      try {
        const userFull = await getUserById(token, decoded.id);
        const userSession = {
          token,
          user: userFull,
        };

        setDataUser(userSession);

        document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax`;
        localStorage.setItem("userSession", JSON.stringify(userSession));

        router.push(PATHROUTES.PROJECTS);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push(PATHROUTES.LOGIN);
      }
    };

    fetchUser();
  }, [router, setDataUser]);

  return (
    <div className="flex justify-center items-center h-screen text-lg text-gray-700">
      Processing your Google login...
    </div>
  );
}
