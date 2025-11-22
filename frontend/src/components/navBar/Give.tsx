import Link from "next/link";
import { PATHROUTES } from "@/helpers/NavItems";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

export default function Give() {
  const { dataUser } = useAuth();

  return (
    <div className="bg-yellow-strong py-2 px-4 flex items-center gap-2 rounded-md group transition duration-300 cursor-pointer">
      <Link
        className="nav-items"
        href={!dataUser ? PATHROUTES.REGISTER : PATHROUTES.PROJECTS}
      >
        GIVE
      </Link>
      <FaHeart className="text-bluesky-strong group-hover:text-blue-strong text-xl" />
    </div>
  );
}
