import { SessionOptions } from "express-session";
import session from "express-session";

const isProd = process.env.NODE_ENV === "production";

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 60 * 1000, 
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    domain: "localhost", // Cambiar al dominio de producción process.env.NODE_ENV === "production" ? "yourdomain.com" : "localhost",
  },
  rolling: true,
  name: "captchaName",
};

export const sessionMiddleware = session(sessionConfig);
