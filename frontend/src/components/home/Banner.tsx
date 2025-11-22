import { PATHROUTES } from "@/helpers/NavItems";
import { P2, TitleBanner } from "../common/Typography";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="flex flex-col-reverse lg:flex-row min-h-[84svh] lg:min-h-[80svh]">
      <div className="bg-black-strong text-white-smoke flex flex-col justify-center lg:px-12 lg:w-[40%] w-full h-[42vh] lg:h-auto px-5">
        <TitleBanner>
          LET&apos;S BUILD <span className="text-yellow-strong">FUTURES</span>{" "}
          <span className="text-bluesky-strong">TOGETHER.</span>
        </TitleBanner>
        <P2 className="mb-6 text-gray-medium">
          At Fund.AR, we promote solidarity projects that improve the quality of
          life of vulnerable communities in Latam.
        </P2>
        <Link
          href={PATHROUTES.PROJECTS}
          className="text-[14px] lg:text-[16px] border-b-2 border-yellow-strong w-fit hover:text-yellow-strong transition"
        >
          See projects →
        </Link>
      </div>

      <div
        className={`flex-1 lg:w-[60%] bg-cover bg-center w-full lg:h-auto h-[42svh] bg-[url("/images/desktop/bannerFundar.webp")]`}
      ></div>
    </section>
  );
}
