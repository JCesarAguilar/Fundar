"use client";

import ProjectCard from "@/components/projects/ProjectCard";
import Pagination from "@/components/projects/Pagination";
import CountryFilter from "@/components/projects/CountryFilter";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/services/project.services";
import { IProject } from "@/interfaces/IProject";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const allProjects = await getAllProjects();
        setProjects(allProjects);

        const uniqueCountries = Array.from(
          new Set(allProjects.map((p: IProject) => p.country).filter(Boolean))
        );
        setCountries(uniqueCountries);
      } catch (err) {
        console.error("Error trayendo proyectos", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 🔍 Filtrar por país si hay uno seleccionado
  const filteredProjects = country
    ? projects.filter((p) => p.country === country)
    : projects;

  // 📄 Lógica de paginación
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <Loading />;
  return (
    <section>
      <div className="relative  lg:pb-10 bg-white-smoke bg-opacity-40 backdrop-blur-2xl pt-7">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10">
          <div className="lg:px-12 pb-7">
            <CountryFilter
              countries={countries}
              selectedCountry={country}
              onChange={(newCountry) => {
                setCountry(newCountry);
                setCurrentPage(1);
              }}
            />
          </div>

          {currentProjects.length > 0 ? (
            currentProjects.map((projectItem) => (
              <ProjectCard project={projectItem} key={projectItem.id} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No hay proyectos disponibles.
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}
