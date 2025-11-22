"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { useProjects } from "@/context/ProjetsContext";
import { useUsers } from "@/context/UserContext";

export default function AdminDashboardPage() {
  const { totalProjects, activeProjects, totalAmountProjects } = useProjects();
  const { totalUsers } = useUsers();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-black-strong">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Projects" value={totalProjects} />
        <StatsCard
          title="Total Donations"
          value={`$ ${totalAmountProjects.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        />
        <StatsCard title="Total Users" value={totalUsers} />
        <StatsCard title="Active Projects" value={activeProjects} />
      </div>
    </section>
  );
}
