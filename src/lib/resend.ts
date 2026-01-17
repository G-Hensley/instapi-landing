import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const languageNames: Record<string, string> = {
  nodejs: "Node.js/Express",
  python: "Python/FastAPI",
  go: "Go",
  java: "Java/Spring Boot",
  ruby: "Ruby on Rails",
  other: "Other",
};

// Use verified domain for sending emails
const FROM_EMAIL = "InstAPI <noreply@instapi.app>";

/**
 * Send email verification link to new waitlist signups
 */
export async function sendVerificationEmail(
  email: string,
  token: string,
  preferredLang: string
) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/verify?token=${token}`;
  const langName = languageNames[preferredLang] || preferredLang;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your email for the InstAPI waitlist",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #fafafa; padding: 40px 20px; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto;">
            <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">
              Verify your email
            </h1>

            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px;">
              Thanks for joining the InstAPI waitlist! Please verify your email address to confirm your spot.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px;">
              You selected <strong style="color: #fafafa;">${langName}</strong> as your preferred language.
            </p>

            <div style="margin: 32px 0;">
              <a href="${verifyUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(to right, #059669, #0d9488, #2563eb); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px;">
                Verify my email
              </a>
            </div>

            <p style="font-size: 14px; color: #71717a; margin-bottom: 8px;">
              Or copy and paste this link into your browser:
            </p>
            <p style="font-size: 14px; color: #52525b; word-break: break-all;">
              ${verifyUrl}
            </p>

            <p style="font-size: 14px; color: #52525b; margin-top: 32px;">
              This link expires in 24 hours.<br><br>
              If you didn't sign up for the InstAPI waitlist, you can safely ignore this email.
            </p>

            <p style="font-size: 14px; color: #52525b; margin-top: 32px;">
              Ship backends in minutes, not days.<br>
              <span style="color: #71717a;">The InstAPI Team</span>
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send welcome email after verification
 */
export async function sendWelcomeEmail(email: string, preferredLang: string) {
  const langName = languageNames[preferredLang] || preferredLang;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the InstAPI waitlist!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #fafafa; padding: 40px 20px; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto;">
            <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px;">
              You're on the list!
            </h1>

            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px;">
              Your email has been verified. Thanks for joining the InstAPI waitlist. We're building something that'll save you hours of backend setup work.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px;">
              You selected <strong style="color: #fafafa;">${langName}</strong> as your preferred language. We'll let you know as soon as it's ready.
            </p>

            <div style="background-color: #18181b; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #71717a; margin: 0 0 8px 0;">What you'll get:</p>
              <ul style="font-size: 14px; color: #a1a1aa; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 4px;">Production-ready backend in minutes</li>
                <li style="margin-bottom: 4px;">Authentication, validation, rate limiting built-in</li>
                <li style="margin-bottom: 4px;">Tests and OpenAPI docs included</li>
                <li>Code you own and control</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #52525b; margin-top: 32px;">
              Ship backends in minutes, not days.<br>
              <span style="color: #71717a;">The InstAPI Team</span>
            </p>
          </div>
        </body>
      </html>
    `,
  });
}
