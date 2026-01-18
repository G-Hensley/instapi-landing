import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { sendVerificationEmail } from "@/lib/resend";
import { generateVerificationToken } from "@/lib/tokens";

// Allowed language values - must match frontend
const ALLOWED_LANGUAGES = [
  "nodejs",
  "python",
  "go",
  "java",
  "ruby",
  "other",
] as const;

/**
 * Sanitize user input to prevent XSS, SQL injection, and other attacks.
 * - Removes HTML tags
 * - Removes dangerous characters and patterns
 * - Normalizes whitespace
 * - Enforces max length
 */
function sanitizeInput(input: string, maxLength: number = 100): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    // Remove any HTML tags
    .replace(/<[^>]*>/g, "")
    // Remove HTML entities
    .replace(/&[#\w]+;/g, "")
    // Remove dangerous characters that could be used for injection
    .replace(/[<>'"`;(){}[\]\\|]/g, "")
    // Remove javascript: and other dangerous protocols
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    // Remove event handler patterns
    .replace(/on\w+\s*=/gi, "")
    // Remove SQL injection patterns
    .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/gi, "")
    .replace(/--/g, "")
    .replace(/\/\*/g, "")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    .trim()
    // Enforce max length
    .slice(0, maxLength);
}

/**
 * Validate that the input contains only safe characters for a programming language name.
 * Allows: letters, numbers, spaces, dots, hyphens, plus signs, hashes, slashes
 */
function isValidLanguageName(input: string): boolean {
  if (!input || input.length < 2 || input.length > 100) {
    return false;
  }
  // Allow common characters found in programming language names
  // e.g., "C++", "C#", ".NET", "Node.js", "Ruby on Rails"
  const validPattern = /^[a-zA-Z0-9\s.\-+#/]+$/;
  return validPattern.test(input);
}

const waitlistSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .transform((email) => email.toLowerCase().trim()),
  preferredLang: z
    .enum(ALLOWED_LANGUAGES)
    .catch("other"), // Default to "other" for invalid values
  otherLanguage: z
    .string()
    .max(100, "Language name too long")
    .optional()
    .transform((val) => val ? sanitizeInput(val, 100) : undefined),
  // Honeypot field - should always be empty
  website: z.string().max(0, "Invalid submission").optional(),
}).refine(
  (data) => {
    // If "other" is selected, otherLanguage should be valid
    if (data.preferredLang === "other" && data.otherLanguage) {
      return isValidLanguageName(data.otherLanguage);
    }
    return true;
  },
  {
    message: "Invalid language name. Use only letters, numbers, and common punctuation.",
    path: ["otherLanguage"],
  }
);

export async function POST(request: NextRequest) {
  try {
    // Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 }
      );
    }

    // Parse body with size limit protection (Next.js has default limits, but be explicit)
    let body;
    try {
      const text = await request.text();
      // Reject suspiciously large payloads
      if (text.length > 10000) {
        return NextResponse.json(
          { error: "Request too large" },
          { status: 413 }
        );
      }
      body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    // Validate input
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      // Check if honeypot was filled (bot detection)
      const flattenedErrors = result.error.flatten();
      if (flattenedErrors.fieldErrors.website) {
        // Silently reject bot submissions with fake success
        return NextResponse.json(
          { message: "Successfully joined the waitlist" },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { error: "Invalid input", details: flattenedErrors },
        { status: 400 }
      );
    }

    const { email, preferredLang, otherLanguage } = result.data;

    // Determine the final language value to store
    // If "other" is selected, combine with the specified language
    const languageToStore = preferredLang === "other" && otherLanguage
      ? `other:${otherLanguage}`
      : preferredLang;

    // Check if email already exists (using normalized email)
    const { data: existing } = await supabase
      .from("waitlist_signups")
      .select("id, email_verified")
      .eq("email", email)
      .single();

    if (existing) {
      // Don't reveal if email exists - generic message
      // But we can resend verification if not verified
      if (!existing.email_verified) {
        // Generate new token and resend
        const token = generateVerificationToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await supabase
          .from("waitlist_signups")
          .update({
            verification_token: token,
            token_expires_at: expiresAt.toISOString(),
            // Update language preference on re-verification
            preferred_lang: languageToStore,
          })
          .eq("id", existing.id);

        try {
          await sendVerificationEmail(email, token, preferredLang);
        } catch (emailError) {
          console.error("Failed to resend verification email:", emailError);
        }
      }

      // Return success regardless to prevent email enumeration
      return NextResponse.json(
        { message: "Successfully joined the waitlist" },
        { status: 201 }
      );
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Insert into database
    const { error: insertError } = await supabase
      .from("waitlist_signups")
      .insert({
        email,
        preferred_lang: languageToStore,
        email_verified: false,
        verification_token: verificationToken,
        token_expires_at: tokenExpiresAt.toISOString(),
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      );
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken, preferredLang);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail the request, but log the error
    }

    return NextResponse.json(
      { message: "Successfully joined the waitlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
