import DeleteButton from "@/components/common/DeleteButton";
import EditButton from "@/components/common/EditButton";
import ProjectModal from "./ProjectModal";
import { useProjects } from "@/context/ProjetsContext";
import { IProject } from "@/interfaces/IProject";
import { deleteProject } from "@/services/project.services";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProjectFormValues } from "@/validators/addProjectSchema";
import { useAuth } from "@/context/AuthContext";
import { confirmAction } from "@/utils/confirmAction";

export default function ProjectTable() {
  const { allProjects, editProject, refreshProjects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const { dataUser } = useAuth();

  const token = dataUser?.token ?? "";

  const handleDelete = async (idProject: string) => {
    const confirmDelete = await confirmAction(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    try {
      await deleteProject(idProject, token);
      toast.success("Project deleted successfully");
      refreshProjects();
    } catch (err) {
      console.error("Error eliminando proyecto", err);
      toast.error("Error deleting project");
    }
  };

  const handleEdit = (project: IProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSave = async (data: IProjectFormValues) => {
    if (!selectedProject) return;

    const updatedData = { ...selectedProject, ...data };
    await editProject(selectedProject.id, updatedData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    refreshProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table className="w-full border-collapse bg-white-smoke shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-strong text-left text-white-smoke">
            <th className="p-3">Name</th>
            <th className="p-3">Country</th>
            <th className="p-3 text-right">Goal</th>
            <th className="p-3 text-right">Raised</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.map((project: IProject) => (
            <tr key={project.id} className="border-b hover:bg-gray-soft">
              <td className="p-3">{project.title}</td>
              <td className="p-3">{project.country}</td>
              <td className="p-3 text-right">
                ${project.goalAmount.toLocaleString()}
              </td>
              <td className="p-3 text-right">
                $
                {project.currentAmount?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="p-3 text-right flex justify-end gap-3">
                <EditButton onEdit={() => handleEdit(project)} />
                <DeleteButton onDelete={() => handleDelete(project.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
