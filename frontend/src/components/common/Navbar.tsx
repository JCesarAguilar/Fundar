"use client";

import {
  privatedAdmNavItems,
  privatedUserNavItems,
  publicNavItems,
} from "@/helpers/NavItems";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Logo from "../navBar/Logo";
import SignIn from "../navBar/SignIn";
import BurgerMenu from "../navBar/BurgerMenu";

export default function Navbar() {
  const { dataUser, isLoading } = useAuth();

  if (isLoading) return null;

  let navItems = publicNavItems;

  if (dataUser?.user.role === "admin") {
    navItems = privatedAdmNavItems;
  } else if (dataUser?.token) {
    navItems = privatedUserNavItems;
  }

  return (
    <nav className="flex justify-between items-center lg:px-10 px-5 h-[8vh] bg-white-smoke text-white-smoke shadow-md lg:h-[10vh]">
      <BurgerMenu />
      <Logo />
      <div className="space-x-5 hidden lg:block">
        {navItems.map((navigationItem, index) => {
          return (
            <Link key={index} href={navigationItem.route} className="nav-items">
              {navigationItem.name}
            </Link>
          );
        })}
      </div>
      <SignIn />
    </nav>
  );
}
