import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/shared/logo-fundar-mobile.webp"
        alt="Imagen de logo"
        width={55}
        height={55}
        className="hidden lg:block"
      />
      <h1 className="text-black-medium text-[30px] font-extrabold hidden tracking-wider lg:block font-kazimir">
        FUND.AR
      </h1>
    </div>
  );
}
