"use client";

import Header from "@/components/dashboard/Header";
import AdmSidebar from "@/components/dashboard/AdmSideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white-smoke text-black-strong">
      <AdmSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
