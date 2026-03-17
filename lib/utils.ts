import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function derive<T>(cb: () => T): T {
  return cb();
}

export function switchMap<T extends string | number | symbol, U>(
  value: T,
  map: Record<T, U>,
): U {
  return map[value];
}


export function mapStringToNumber(str: string, maxNum: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % (maxNum + 1);
}