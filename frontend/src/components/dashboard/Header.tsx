"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { dataUser } = useAuth();

  return (
    <header className="flex items-center justify-baseline bg-gray-strong shadow-sm py-4 px-6 mb-6 text-white-smoke">
      <h2 className="text-xl font-semibold capitalize">
        {dataUser?.user.role} Dashboard
      </h2>
      {/* <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-strong text-white rounded-full flex items-center justify-center font-semibold uppercase">
            {dataUser?.user.role.charAt(0)}
          </div>
          <span className="text-sm font-medium capitalize">
            {dataUser?.user.role}
          </span>
        </div>
      </div> */}
    </header>
  );
}
