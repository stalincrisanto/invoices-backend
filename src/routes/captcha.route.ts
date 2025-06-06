import { Router } from "express";
import { generateCaptchaController } from "../controllers";
import { apiLimiter } from "../config/limits";

const routerCaptcha = Router();

routerCaptcha.get("/generate", apiLimiter, generateCaptchaController);

export default routerCaptcha;
