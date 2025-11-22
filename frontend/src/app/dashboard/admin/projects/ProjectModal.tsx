"use client";

import ProjectForm from "@/components/forms/ProjectForm";
import { IProject } from "@/interfaces/IProject";
import { IProjectFormValues } from "@/validators/addProjectSchema";

interface ProjectModalProps {
  project?: IProject | null;
  onSave: (values: IProjectFormValues) => void;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  onSave,
  onClose,
}: ProjectModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <ProjectForm project={project} onSave={onSave} onClose={onClose} />
      </div>
    </>
  );
}
