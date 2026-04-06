"use client";

import { useEffect, useRef } from "react";

function drawSquare(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#111111";

  const squareSize = 80;
  const x = Math.round((width - squareSize) / 2);
  const y = Math.round((height - squareSize) / 2);

  context.fillRect(x, y, squareSize, squareSize);
}

export default function OrgVisualizerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => drawSquare(canvas);

    render();
    window.addEventListener("resize", render);

    return () => window.removeEventListener("resize", render);
  }, []);

  return <canvas ref={canvasRef} className="block h-screen w-screen" />;
}