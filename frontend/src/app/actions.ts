"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionData {
  aut?: string;
  role?: string;
}

async function getSession() {
  const password = process.env.SESSION_SECRET;

  if (!password) {
    throw new Error("SESSION_SECRET is not configured");
  }

  return getIronSession<SessionData>(await cookies(), {
    password,
    cookieName: "TULIP-COOKIE-MONSTER",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  });
}

export async function getSessionData(): Promise<string> {
  const session = await getSession();

  return JSON.stringify({
    aut: session.aut ?? "",
    role: session.role ?? "",
  });
}

export async function createSession(
  authToken: string,
  role: string,
): Promise<void> {
  const session = await getSession();

  session.aut = authToken;
  session.role = role;

  await session.save();
}

export async function deleteSession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}