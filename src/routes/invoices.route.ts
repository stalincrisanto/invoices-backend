import { Router } from "express";
import { getInvoices } from "../controllers";

const routerInvoices = Router();

routerInvoices.get('/', getInvoices);

export default routerInvoices;