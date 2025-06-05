import { Router } from "express";
import routerInvoices from "./invoices.route";
import routerCaptcha from "./captcha.route";

const router = Router();

router.use("/invoices", routerInvoices);
router.use("/captcha", routerCaptcha);

export default router;
