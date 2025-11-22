"use client";

import { PATHROUTES } from "@/helpers/NavItems";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Give from "../navBar/Give";

export default function SignIn() {
  const { dataUser, logout } = useAuth();

  return (
    <div className="flex items-center gap-5 lg:gap-7">
      {dataUser ? (
        <button type="button" onClick={() => logout()} className="nav-items">
          SIGN OUT
        </button>
      ) : (
        <Link className="nav-items" href={PATHROUTES.LOGIN}>
          SIGN IN
        </Link>
      )}

      <div className="w-px h-7 bg-black-medium"></div>
      <Give />
    </div>
  );
}
