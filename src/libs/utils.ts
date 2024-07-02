import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFileType(file: File) {
  return ALLOWED_FILE_TYPES.includes(file.type);
}
