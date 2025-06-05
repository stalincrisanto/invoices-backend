import { create, CaptchaObj } from "svg-captcha";
export const generateCaptchaService = (): CaptchaObj => {
  const captcha = create({
    size: 6,
    ignoreChars: "0o1i",
    noise: 2,
    color: true,
    background: "white",
    
  });
  return {
    text: captcha.text,
    data: captcha.data,
  };
};
