import { P2, TitleForm } from "@/components/common/Typography";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <section className="relative bg-gray-strong h-screen bg-covr">
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen ">
        <div className="lg:bg-[url('/images/shared/imageLogin.webp')] lg:bg-cover lg:w-1/2 lg:h-screen "></div>
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        <div className="lg:w-1/2 flex flex-col justify-center place-items-center h-screen z-10">
          <div className="bg-white-smoke shadow-md rounded-md p-8 flex flex-col gap-5">
            <TitleForm>Sign in to your account</TitleForm>
            <P2 className="text-gray-strong text-center max-w-md">
              Sign in today to view your impact, manage your donations, and
              connect with others.
            </P2>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
