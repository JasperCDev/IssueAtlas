import { RiSparklingLine } from "@remixicon/react";
import { Space_Grotesk } from "next/font/google";

const logoFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
});

type IssueAtlasLogoProps = {
  className?: string;
  iconSize?: number;
};

export function IssueAtlasLogo({
  className,
  iconSize = 20,
}: IssueAtlasLogoProps) {
  return (
    <span className={className ?? "inline-flex items-center gap-2 "}>
      <RiSparklingLine size={iconSize} className="text-primary" />
      <span className={`${logoFont.className} text-xl font-bold`}>
        Issue<span className="text-primary">Atlas</span>
      </span>
    </span>
  );
}