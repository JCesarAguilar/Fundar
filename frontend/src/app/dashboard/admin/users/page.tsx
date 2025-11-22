"use client";

import UserDetailModal from "@/components/dashboard/UserDetailModal";
import UserList from "@/components/dashboard/UserList";
import { useUsers } from "@/context/UserContext";
import { useState } from "react";

export default function UsersPage() {
  const { allUsers, totalUsers } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <section>
      {allUsers.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Users <span className="text-xl">({totalUsers})</span>
          </h2>
          <UserList onSelect={setSelectedUserId} />
        </section>
      ) : (
        <p className="text-gray-strong">There are no users yet.</p>
      )}

      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </section>
  );
}
