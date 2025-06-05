import { Router } from "express";
import {
  generatePdfController,
  getAllInvoicesController,
} from "../controllers";
import { validateCaptcha } from "../middleware/validateCaptcha";

const routerInvoices = Router();

routerInvoices.get("/", validateCaptcha, getAllInvoicesController);
routerInvoices.post("/", generatePdfController);

export default routerInvoices;
