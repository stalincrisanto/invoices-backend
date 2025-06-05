import { SessionOptions } from "express-session";
import session from "express-session";

export const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 60 * 1000, 
    secure: false, //TODO: cambiar al activar en producción o mejor aplicar validación ?
    httpOnly: true, // Previene el acceso a la cookie desde JavaScript
    sameSite: "strict", // Helps prevent CSRF attacks
  },
  rolling: true, // Renueva la cookie en cada solicitud
  name: "captchaName"
};

export const sessionMiddleware = session(sessionConfig);
