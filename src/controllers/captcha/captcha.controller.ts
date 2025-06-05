import type { Request, Response } from "express";
import { generateCaptchaService } from "../../services/captcha.service";

export const generateCaptchaController = (req: Request, res: Response) => {
  try {
    const { text, data } = generateCaptchaService();
    // Guardar el texto del captcha en la sesión
    req.session.captcha = text;
    req.session.captchaGeneratedAt = Date.now();
    console.log("Session Captcha:", {
      id: req.session.id,
      sessionId: req.sessionID,
      captcha: req.session.captcha,
      generatedAt: req.session.captchaGeneratedAt,
    });
    res.status(200).json({
      success: true,
      message: "Captcha generado correctamente",
      data: {
        captchaImage: data,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error al generar el captcha",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
