"use client";

import dynamic from "next/dynamic";

const OverviewContentNoSSR = dynamic(
  () => import("./overview-content").then((m) => m.OverviewContent),
  { ssr: false },
);

export function OverviewContentClient() {
  return <OverviewContentNoSSR />;
}
