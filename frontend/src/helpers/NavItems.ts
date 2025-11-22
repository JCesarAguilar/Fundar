export enum PATHROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  USER_DASHBOARD = "/dashboard/profile",
  ADM_DASHBOARD = "/dashboard/admin",
  EDUCATION = "/projects/education",
  NUTRITION = "/projects/nutrition",
  INFRAESTRUCTURE = "/projects/infraestructure",
  ENVIROMENT = "/projects/enviroment",
  HEALTH = "/projects/health",
  PROJECTS = "/projects",
}

export const publicNavItems = [
  {
    name: "HOME",
    route: PATHROUTES.HOME,
    prefetch: true,
  },
  {
    name: "OUR PROJECTS",
    route: PATHROUTES.PROJECTS,
    prefetch: true,
  },
];

export const privatedUserNavItems = [
  {
    name: "HOME",
    route: PATHROUTES.HOME,
    prefetch: true,
  },
  {
    name: "OUR PROJECTS",
    route: PATHROUTES.PROJECTS,
    prefetch: true,
  },
  {
    name: "MY HELP",
    route: PATHROUTES.USER_DASHBOARD,
    prefetch: true,
  },
];

export const privatedAdmNavItems = [
  {
    name: "HOME",
    route: PATHROUTES.HOME,
    prefetch: true,
  },
  {
    name: "OUR PROJECTS",
    route: PATHROUTES.PROJECTS,
    prefetch: true,
  },
  {
    name: "DASHBOARD",
    route: PATHROUTES.ADM_DASHBOARD,
    prefetch: true,
  },
];
