import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/resend";
import { isTokenExpired } from "@/lib/tokens";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token || token.length !== 64) {
      return redirectWithMessage("error", "Invalid verification link");
    }

    // Find the signup with this token
    const { data: signup, error: fetchError } = await supabase
      .from("waitlist_signups")
      .select("id, email, preferred_lang, email_verified, token_expires_at")
      .eq("verification_token", token)
      .single();

    if (fetchError || !signup) {
      return redirectWithMessage("error", "Invalid or expired verification link");
    }

    // Check if already verified
    if (signup.email_verified) {
      return redirectWithMessage("already_verified", "Email already verified");
    }

    // Check if token expired
    if (signup.token_expires_at && isTokenExpired(signup.token_expires_at)) {
      return redirectWithMessage("expired", "Verification link has expired");
    }

    // Mark as verified and clear the token
    const { error: updateError } = await supabase
      .from("waitlist_signups")
      .update({
        email_verified: true,
        verification_token: null,
        token_expires_at: null,
        verified_at: new Date().toISOString(),
      })
      .eq("id", signup.id);

    if (updateError) {
      console.error("Failed to verify email:", updateError);
      return redirectWithMessage("error", "Failed to verify email");
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(signup.email, signup.preferred_lang);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail verification if welcome email fails
    }

    return redirectWithMessage("success", "Email verified successfully");
  } catch (error) {
    console.error("Verification error:", error);
    return redirectWithMessage("error", "An unexpected error occurred");
  }
}

function redirectWithMessage(status: string, message: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = new URL("/verified", baseUrl);
  url.searchParams.set("status", status);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url);
}
