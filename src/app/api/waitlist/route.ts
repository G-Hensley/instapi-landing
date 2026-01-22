import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
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
 */
function sanitizeInput(input: string, maxLength: number = 100): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&[#\w]+;/g, "")
    .replace(/[<>'"`;(){}[\]\\|]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/gi, "")
    .replace(/--/g, "")
    .replace(/\/\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate that the input contains only safe characters for a programming language name.
 */
function isValidLanguageName(input: string): boolean {
  if (!input || input.length < 2 || input.length > 100) {
    return false;
  }
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
    .catch("other"),
  otherLanguage: z
    .string()
    .max(100, "Language name too long")
    .optional()
    .transform((val) => val ? sanitizeInput(val, 100) : undefined),
  website: z.string().max(0, "Invalid submission").optional(),
}).refine(
  (data) => {
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
    // Check if admin client is available
    if (!supabaseAdmin) {
      console.error("supabaseAdmin not configured - SUPABASE_SERVICE_ROLE_KEY missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 }
      );
    }

    // Parse body
    let body;
    try {
      const text = await request.text();
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
      const flattenedErrors = result.error.flatten();
      if (flattenedErrors.fieldErrors.website) {
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

    const languageToStore = preferredLang === "other" && otherLanguage
      ? `other:${otherLanguage}`
      : preferredLang;

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from("waitlist_signups")
      .select("id, email_verified")
      .eq("email", email)
      .single();

    if (existing) {
      if (!existing.email_verified) {
        const token = generateVerificationToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await supabaseAdmin
          .from("waitlist_signups")
          .update({
            verification_token: token,
            token_expires_at: expiresAt.toISOString(),
            preferred_lang: languageToStore,
          })
          .eq("id", existing.id);

        try {
          await sendVerificationEmail(email, token, preferredLang);
        } catch (emailError) {
          console.error("Failed to resend verification email:", emailError);
        }
      }

      return NextResponse.json(
        { message: "Successfully joined the waitlist" },
        { status: 201 }
      );
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Insert into database
    const { error: insertError } = await supabaseAdmin
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
