import { PATHROUTES } from "./NavItems";

export enum CATEGORY {
  education = 1,
  nutrition = 2,
  community_infra = 3,
  enviroment = 4,
  health = 5,
}

export const projectCategories = [
  {
    title: "EDUCATION",
    route: PATHROUTES.EDUCATION,
  },
  {
    title: "NUTRITION",
    route: PATHROUTES.NUTRITION,
  },
  {
    title: "INFRAESTRUCTURE",
    route: PATHROUTES.INFRAESTRUCTURE,
  },
  {
    title: "ENVIROMENT",
    route: PATHROUTES.ENVIROMENT,
  },
  {
    title: "HEALTH",
    route: PATHROUTES.HEALTH,
  },
];

export function getCategoryNameById(id: number): string | undefined {
  return Object.keys(CATEGORY).find(
    (key) => CATEGORY[key as keyof typeof CATEGORY] === id
  );
}
