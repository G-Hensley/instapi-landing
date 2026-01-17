import { randomBytes } from "crypto";

/**
 * Generate a secure verification token
 */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Check if a token has expired
 */
export function isTokenExpired(expiresAt: string | Date): boolean {
  const expiry = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  return expiry < new Date();
}
