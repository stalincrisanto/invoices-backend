import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Límite de peticiones por IP
  message: {
    status: 429,
    error:
      "Demasiadas solicitudes. Intenta nuevamente en 1 minuto.",
  },
});
