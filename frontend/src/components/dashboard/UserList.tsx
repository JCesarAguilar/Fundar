"use client";

import UserCard from "./UserCard";
import { useUsers } from "@/context/UserContext";

interface UserListProps {
  onSelect: (id: string) => void;
}

export default function UserList({ onSelect }: UserListProps) {
  const { allUsers } = useUsers();

  const sortedUsers = [...allUsers].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
      {sortedUsers.map((user) => (
        <UserCard key={user.id} user={user} onClick={() => onSelect(user.id)} />
      ))}
    </div>
  );
}
