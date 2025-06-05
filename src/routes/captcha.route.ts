import { Router } from "express";
import { generateCaptchaController } from "../controllers";

const routerCaptcha = Router();

routerCaptcha.get("/generate", generateCaptchaController);

export default routerCaptcha;
