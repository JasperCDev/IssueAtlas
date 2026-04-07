export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();

  const red = Number.parseInt("0x" + normalized.slice(0, 2));
  const green = Number.parseInt("0x" + normalized.slice(2, 4));
  const blue = Number.parseInt("0x" + normalized.slice(4, 6));

  return `rgb(${red}, ${green}, ${blue})`;
}
