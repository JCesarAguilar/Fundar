"use client";

import Header from "@/components/dashboard/Header";
import UserSidebar from "@/components/dashboard/UserSideBar";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white-smoke text-black-strong">
      <UserSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
