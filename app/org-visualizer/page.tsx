"use client";

import { useEffect, useRef } from "react";
import { CanvasVisualizer } from "@/features/org-visualizer";

export default function OrgVisualizerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const visualizer = new CanvasVisualizer(canvas);
    visualizer.mount();

    return () => visualizer.unmount();
  }, []);

  return <canvas ref={canvasRef} className="bg-black" />;
}
