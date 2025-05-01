import { Router } from "express";
import routerInvoices from "./invoices.route";

const router = Router();

router.use("/invoices", routerInvoices);

export default router;
