"use client";

import ProjectTable from "./ProjectTable";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useProjects } from "@/context/ProjetsContext";

export default function ProjectsPage() {
  const { totalProjects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="space-y-6 bg-white-smoke">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-2xl font-semibold">
          <h2>Projects</h2>
          <h2 className="text-xl">({totalProjects})</h2>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-strong text-white-smoke px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-medium cursor-pointer"
        >
          <PlusCircle size={18} /> Add Project
        </button>
      </div>
      <ProjectTable />

      {isModalOpen && (
        <ProjectModal
          project={null}
          onSave={() => {}}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
