import { Router } from "express";
import {
  generatePdfController,
  getAllInvoicesController,
} from "../controllers";

const routerInvoices = Router();

routerInvoices.get("/", getAllInvoicesController);
routerInvoices.post("/", generatePdfController);

export default routerInvoices;
