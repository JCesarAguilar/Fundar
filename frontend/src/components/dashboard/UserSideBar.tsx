"use client";

import Link from "next/link";
import Loading from "../common/Loading";
import { usePathname } from "next/navigation";
import { LayoutDashboard, HandCoins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/dashboard/profile", label: "My Account", icon: LayoutDashboard },

  {
    href: "/dashboard/profile/donations",
    label: "My Donations",
    icon: HandCoins,
  },
];

export default function UserSidebar() {
  const { dataUser, isLoading } = useAuth();
  const pathname = usePathname();

  return isLoading ? (
    <aside>
      <Loading />
    </aside>
  ) : (
    <aside className="w-64 bg-gray-strong shadow-md p-6 hidden lg:flex flex-col justify-between">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white-smoke capitalize">
          {` Hola ${
            dataUser?.user.firstName?.split(" ")[0] || dataUser?.user.role
          }`}
        </h2>
        <nav className="flex flex-col gap-3">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center text-white-strong gap-3 rounded-lg px-3 py-2 transition-all ${
                  active
                    ? "bg-gray-medium hover:text-white-strong"
                    : "hover:bg-gray-soft hover:text-gray-strong"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <p className="text-xs text-gray-medium text-center">© 2025 Fund.ar</p>
    </aside>
  );
}
