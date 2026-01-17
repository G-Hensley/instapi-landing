import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
// For production, use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute for waitlist

function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback to a default for local development
  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

export function middleware(request: NextRequest) {
  // Only apply rate limiting to the waitlist API
  if (
    request.nextUrl.pathname === "/api/waitlist" &&
    request.method === "POST"
  ) {
    const ip = getClientIP(request);
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // Add rate limit headers to the response
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", MAX_REQUESTS_PER_WINDOW.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/waitlist"],
};
