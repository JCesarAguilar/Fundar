"use client";

import { IProject } from "@/interfaces/IProject";
import { getAllProjects, updateProject } from "@/services/project.services";
import { IProjectFormValues } from "@/validators/addProjectSchema";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

//Defino Interfaz que define los valores
interface ProjectsContextProps {
  allProjects: IProject[];
  totalProjects: number;
  activeProjects: number;
  totalAmountProjects: number;
  refreshProjects: () => Promise<void>;
  editProject: (
    idProject: string,
    projectData: IProjectFormValues
  ) => Promise<void>;
}

//Esto si es la creacion del context y la definicion de sus valores iniciales
const ProjectsContext = createContext<ProjectsContextProps>({
  allProjects: [],
  totalProjects: 0,
  activeProjects: 0,
  totalAmountProjects: 0,
  refreshProjects: async () => {},
  editProject: async () => {},
});

//Defino Interfaz de ProjectsProvider
interface ProjectsProviderProps {
  children: React.ReactElement;
}

//Crear nuestro componente de ProjectsProvider, encargado de manejar estados, etc
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
  children,
}) => {
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const [projects, setProjects] = useState<IProject[]>([]);

  const refreshProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error al cargar proyectos", err);
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === "active"
  ).length;

  const editProject = async (
    idProject: string,
    projectData: IProjectFormValues
  ) => {
    const updated = await updateProject(token, idProject, projectData);
    setProjects((prev) =>
      prev.map((project) => (project.id === updated.id ? updated : project))
    );
  };

  const totalAmountProjects = projects.reduce(
    (acc, project) => acc + (project.currentAmount || 0),
    0
  );

  return (
    <ProjectsContext.Provider
      value={{
        allProjects: projects,
        totalProjects,
        activeProjects,
        totalAmountProjects,
        refreshProjects,
        editProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
