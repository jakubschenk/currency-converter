import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterStringToFloatNumberString(value: string): string {
  const filteredInput = value.replace(/[^\d.]+/, "");
  const firstDotIndex = filteredInput.indexOf(".");

  return firstDotIndex !== -1
    ? filteredInput.substring(0, firstDotIndex + 1) +
        filteredInput.substring(firstDotIndex + 1).replace(/\./g, "")
    : filteredInput;
}
