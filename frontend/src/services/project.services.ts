/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProject } from "@/interfaces/IProject";
import { IProjectFormValues } from "@/validators/addProjectSchema";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProjects = async () => {
  try {
    const res = await fetch(`${apiURL}/projects`, {
      method: "GET",
    });
    const projects: IProject[] = await res.json();
    return projects;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProjectById = async (idByParam: string) => {
  try {
    const allProjects = await getAllProjects();
    const project = allProjects.find(
      (project) => project.id.toString() === idByParam
    );
    if (!project) {
      throw new Error("No se encontró el proyecto");
    }
    return project;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addProject = async (
  projectData: IProjectFormValues,
  token: string
) => {
  try {
    const res = await fetch(`${apiURL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    const project = await res.json();
    return project;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProject = async (idProject: string, token: string) => {
  try {
    const res = await fetch(`${apiURL}/projects/${idProject}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Error al elminiar el proyecto con id ${idProject}`);
    }
    return true;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateProject = async (
  token: string,
  idProject: string,
  projectData: IProjectFormValues
) => {
  try {
    const res = await fetch(`${apiURL}/projects/${idProject}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!res.ok) throw new Error("Error al actualizar el proyecto");

    const updatedProject = await res.json();
    return updatedProject;
  } catch (err: any) {
    throw new Error(err);
  }
};
