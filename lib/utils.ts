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
const max = 10;
const testStrings = [
  "example",
  "another",
  "test",
  "hello",
  "world",
  "foo",
  "bar",
  "baz",
  "typescript",
  "example", // should match Test 1
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
];

testStrings.forEach((str, idx) => {
  const result = mapStringToNumber(str, max);
  console.log(`Test ${idx + 1}: mapStringToNumber("${str}", ${max}) = ${result}`);
});