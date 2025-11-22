import Image from "next/image";
import { Edit3 } from "lucide-react";
import { IUser } from "@/interfaces/IUser";
import { FaUser } from "react-icons/fa6";
import { updateUserRole } from "@/services/user.services";
import { toast } from "sonner";
import { useUsers } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { confirmAction } from "@/utils/confirmAction";

interface UserCardProps {
  user: IUser;
  onClick: () => void;
}

export default function UserCard({ user, onClick }: UserCardProps) {
  const { refreshUsers } = useUsers();
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const handleToggleRole = async (
    userId: string,
    currentRole: "admin" | "user"
  ) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirmDelete = await confirmAction(
      "Are you sure you want to change this role?"
    );
    if (!confirmDelete) return;

    try {
      await updateUserRole(token, userId, newRole);
      toast.success(`User role updated to ${newRole}`);
      await refreshUsers();
    } catch {
      toast.error("Error updating user role");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3 bg-white-smoke rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-3">
          {user.imageUrl ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={user.imageUrl}
                alt={`Avatar of ${user.email}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-soft flex items-center justify-center">
              <FaUser className="text-gray-strong text-lg" />
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={onClick}
              className="font-medium text-gray-strong cursor-pointer flex flex-col items-baseline"
            >
              {user.firstName ? user.firstName.split(" ")[0] : ""}{" "}
              {user.lastName ?? ""}
              <p className="text-xs text-gray-medium">{user.email}</p>
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            handleToggleRole(user.id, user.role as "admin" | "user")
          }
          className="cursor-pointer flex gap-2"
        >
          {user.role === "admin" ? (
            <p className="text-sm font-semibold text-red-400">{user.role}</p>
          ) : (
            <p className="text-sm font-semibold text-green-600">{user.role}</p>
          )}
          <Edit3 size={14} className="text-black-strong" />
        </button>
      </div>
    </div>
  );
}
