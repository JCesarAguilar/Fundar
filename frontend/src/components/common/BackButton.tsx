"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={`text-black-strong font-normal pt-7 text-[14px] lg:pt-0 lg:mb-0 hover:underline cursor-pointer px-7 lg:px-30 `}
    >
      Go Back
    </button>
  );
}
