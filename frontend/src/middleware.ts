import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATHROUTES } from "./helpers/NavItems";

const PUBLIC_ROUTES: string[] = [
  PATHROUTES.HOME,
  PATHROUTES.LOGIN,
  PATHROUTES.REGISTER,
];
const OAUTH_ROUTES = [
  "/auth/google",
  "/auth/google/callback",
  "/google-success",
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const token = req.cookies.get("token")?.value ?? null;

  // 1️⃣ --- RUTAS OAUTH SIEMPRE PERMITIDAS ---
  if (OAUTH_ROUTES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 2️⃣ --- DECODE TOKEN UNA SOLA VEZ ---
  let role: string | null = null;

  if (token) {
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      role = decodedPayload.role;
    } catch (err) {
      console.log("❌ Error decodificando token:", err);
    }
  }

  // 3️⃣ --- SI ESTÁ LOGUEADO NO PUEDE IR A LOGIN/REGISTER ---
  if (
    token &&
    (pathname === PATHROUTES.LOGIN || pathname === PATHROUTES.REGISTER)
  ) {
    url.pathname =
      role === "admin" ? PATHROUTES.ADM_DASHBOARD : PATHROUTES.USER_DASHBOARD;
    return NextResponse.redirect(url);
  }

  // 4️⃣ --- RUTAS PÚBLICAS ---
  const isPublic =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith(PATHROUTES.PROJECTS);

  if (isPublic) {
    return NextResponse.next();
  }

  // 5️⃣ --- SI NO TIENE TOKEN REDIRECT A LOGIN ---
  if (!token) {
    url.pathname = PATHROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  // 6️⃣ --- PROTECCIÓN POR ROL ---
  const isAdminRoute = pathname.startsWith(PATHROUTES.ADM_DASHBOARD);
  const isUserRoute = pathname.startsWith(PATHROUTES.USER_DASHBOARD);

  if (role === "user" && isAdminRoute) {
    url.pathname = PATHROUTES.USER_DASHBOARD;
    return NextResponse.redirect(url);
  }

  if (role === "admin" && isUserRoute) {
    url.pathname = PATHROUTES.ADM_DASHBOARD;
    return NextResponse.redirect(url);
  }

  // 7️⃣ --- SI TODO OK ---
  return NextResponse.next();
}

// --- MATCHER ---
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$|api/auth).*)",
  ],
};
