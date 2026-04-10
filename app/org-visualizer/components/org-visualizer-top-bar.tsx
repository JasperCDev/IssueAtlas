"use client";

import Link from "next/link";
import { IssueAtlasLogo } from "../../../components/issue-atlas-logo";

export function OrgVisualizerTopBar() {
  return (
    <div className="bg-sidebar text-sidebar-foreground border-sidebar-border pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center border-b p-2">
      <Link
        href="/dashboard"
        className="pointer-events-auto inline-flex items-center gap-2 text-sidebar-foreground"
      >
        <IssueAtlasLogo className="inline-flex items-center gap-2 text-sidebar-foreground" />
      </Link>
    </div>
  );
}