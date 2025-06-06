import { NextFunction, Request, Response } from "express";

export const validateCaptcha = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const CAPTCHA_LIFETIME = 7 * 60 * 1000; // 7 minutos en milisegundos

  if (!req.session.captcha || req.session.captcha === "") {
    res.status(400).json({
      success: false,
      message: "No se ha enviado el captcha",
    });
  }

  if (req.session.captchaGeneratedAt) {
    if (Date.now() - req.session.captchaGeneratedAt > CAPTCHA_LIFETIME) {
      req.session.captcha = null;
      res.status(401).json({
        success: false,
        error: "CAPTCHA expirado. Por favor genere uno nuevo",
        code: "CAPTCHA_EXPIRED",
      });
    }
  }

  if (req.query.captchaText !== req.session.captcha) {
    res.status(403).json({
      success: false,
      error: "CAPTCHA incorrecto. Intente nuevamente",
      code: "CAPTCHA_INVALID",
    });
  }

  next();
};
