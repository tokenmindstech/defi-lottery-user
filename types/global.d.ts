/**
 * @file global.d.ts
 * @description This file contains global type declarations for the project.
 */

export {};

declare global {
  type RoleType = "USER" | "ADMIN" | "AGENT";

  interface CustomIconProps {
    className?: string;
  }
}
