import { IProject } from "@/interfaces/IProject";
import { P3, TitleProject } from "../common/Typography";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  project: IProject;
}

export default function ProjectCard({ project }: CardProps) {
  let firstPart = "";
  let lastWord = "";

  if (project) {
    const titleDivided = project?.title.split(" ");
    lastWord = titleDivided?.pop() || "";
    firstPart = titleDivided.join(" ");
  }

  return (
    <section
      key={project.title}
      className="group flex flex-col lg:flex lg:flex-row   even:lg:flex-row-reverse odd:bg-black-medium even:bg-white-smoke"
    >
      <div className="lg:w-[60%]">
        <Image
          src={project.imageUrls[0]}
          alt={`Imagen de ${project.title}`}
          width={1000}
          height={1000}
          className="h-[600px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-5 place-items-center lg:place-items-start lg:w-[40%] lg:px-12">
        <TitleProject className="font-extrabold leading-13 group-odd:text-white-strong text-black-medium">
          {firstPart}
          <br />
          {lastWord}
        </TitleProject>
        <P3 className="group-even:text-gray-strong">{project.resume}</P3>
        <Link href={`/projects/${project.id}`}>
          <button className="btn-primary mt-7">SEE MORE</button>
        </Link>
      </div>
    </section>
  );
}
