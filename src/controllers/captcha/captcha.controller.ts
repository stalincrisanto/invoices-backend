import type { Request, Response } from "express";
import { generateCaptchaService } from "../../services/captcha.service";

export const generateCaptchaController = (req: Request, res: Response) => {
  try {
    const { text, data } = generateCaptchaService();
    req.session.captcha = text;
    req.session.captchaGeneratedAt = Date.now();
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
