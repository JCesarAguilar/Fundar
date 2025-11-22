"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import { P2, TitleForm } from "@/components/common/Typography";
import { useUsers } from "@/context/UserContext";

export default function Register() {
  const { totalUsers } = useUsers();
  return (
    <section className="relative flex justify-center items-center min-h-screen bg-[url('/images/shared/collageRegister.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 bg-white-smoke shadow-md rounded-md p-8 flex flex-col gap-3">
        <TitleForm>Create your account</TitleForm>
        <P2 className="text-gray-strong text-center mt-2">
          You&apos;re about to join {totalUsers} incredible members.
        </P2>
        <RegisterForm />
      </div>
    </section>
  );
}
