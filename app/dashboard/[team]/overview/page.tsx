"use client";

import { useParams } from "next/navigation";
import { resolveTeamId } from "@/lib/mock-data";
import { OverviewContent } from "./components/overview-content";

export default function TeamOverviewPage() {
  const params = useParams<{ team?: string }>();
  const teamId = resolveTeamId(params?.team);

  return <OverviewContent key={`overview-${teamId}`} />;
}
