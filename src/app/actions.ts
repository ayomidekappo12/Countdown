"use server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionData {
  aut: string;
  role: string;
}

async function getSession() {
  return await getIronSession<SessionData>(await cookies(), {
    password: `${process.env.SESSION_SECRET}`,
    cookieName: "TULIP-COOKIE-MONSTER",
    cookieOptions: {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
    },
  });
}

export async function getSessionData() {
  const session = await getSession();

  return JSON.stringify({
    aut: session.aut,
    role: session.role,
  });
}

export async function createSession(authToken: string, role: string) {
  const session = await getSession();
  session.aut = authToken;
  session.role = role;
  await session.save();
}

export async function deleteSession() {
  const session = await getSession();
  await session.destroy();
}
