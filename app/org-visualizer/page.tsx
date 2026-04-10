"use client";
import { OrgVisualizerTopBar } from "./components/org-visualizer-top-bar";
import OrgVisCanvas from "./components/org-vis-canvas";

export default function OrgVisualizerPage() {
  return (
    <div className="dark relative h-screen w-full overflow-hidden bg-background text-foreground">
      <OrgVisualizerTopBar />
      <OrgVisCanvas />
    </div>
  );
}
