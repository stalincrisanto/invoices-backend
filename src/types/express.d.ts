import "express-session";

declare module "express-session" {
  interface Session {
    captcha: string | null;
    captchaGeneratedAt?: number;
  }
}
