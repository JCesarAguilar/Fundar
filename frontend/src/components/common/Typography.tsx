import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const TitleBanner = ({ children, className }: TypographyProps) => {
  return (
    <h1
      className={`text-[30px] lg:text-4xl font-bold mb-4 leading-tight font-kazimir ${className}`}
    >
      {children}
    </h1>
  );
};

export const TitleCategory = ({ children, className }: TypographyProps) => {
  return (
    <h2
      className={`text-black-medium font-semibold text-[22px] tracking-[2] lg:text-[35px] lg:tracking-[4] bg-white-smoke h-[12vh] grid place-items-center lg:h-[20vh] ${className}`}
    >
      {children}
    </h2>
  );
};

export const TitleProject = ({ children, className }: TypographyProps) => {
  return (
    <h1
      className={`text-[30px] lg:text-5xl font-bold mb-4 leading-15 font-kazimir uppercase tracking-wider ${className}`}
    >
      {children}
    </h1>
  );
};

export const TitleForm = ({ children, className }: TypographyProps) => {
  return (
    <h2
      className={`text-3xl font-kazimir text-black-medium text-center font-stretch-semi-condensed ${className}`}
    >
      {children}
    </h2>
  );
};

export const H2 = ({ children, className }: TypographyProps) => {
  return (
    <p
      className={`text-[30px] font-bold font-kazimir tracking-wide leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
};

export const P1 = ({ children, className }: TypographyProps) => {
  return (
    <p className={`text-[14px] lg:text-[18px] leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export const P2 = ({ children, className }: TypographyProps) => {
  return (
    <p className={`text-[14px] lg:text-[16px] leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

export const P3 = ({ children, className }: TypographyProps) => {
  return (
    <p
      className={`bg-linear-to-r from-gray-medium to-gray-soft bg-clip-text text-transparent drop-shadow-lg text-[14px] lg:text-[16px] leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
};
