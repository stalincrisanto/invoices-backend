import path from "path";
import fs from "fs/promises";
import { db } from "../config/db";
import puppeteer from "puppeteer";
import { formatDataForPdf } from "../utils/formatDataForPdf";

export const getAllInvoicesService = async (params: Params) => {
  const { documentId, dateStart, dateEnd } = params;
  const query = `
  SELECT 
    sri.id,
    sri.account_razon,
    sri.account_fiscal_id,
    sri.chs_data_dat,
    CONCAT(sri.ce_serie, '-', sri.ce_secuencial) AS invoice_number,
    sri.ce_ca,
    sri.fecha_autorizacion,
    sri.cashmov_ope,
    sri.cashmov_cant,
    sri.cashmov_des,
    sri.cashmov_imp,
    sri.for_amt,
    sri.account_dir,
    sri.account_email,
    CONCAT(sri.paymod_code, ' - ', sri.paymod_des) AS paymod
  FROM srimvmn sri
  WHERE sri.cashmov_type = '01'
    AND sri.account_fiscal_id = ?
    AND sri.chs_data_dat BETWEEN ? AND ?
  ORDER BY sri.chs_data_dat DESC
  LIMIT 50
  OFFSET 0;
  `;

  try {
    const [rows] = await db.query(query, [documentId, dateStart, dateEnd]);
    const invoicesData: Invoice[] = rows as Invoice[];
    return invoicesData;
  } catch (error) {
    console.error("Error al consultar las facturas:", error);
    throw new Error("No se pudo obtener las facturas desde la base de datos");
  }
};

export const generatePdfService = async (invoice: Invoice) => {
  const epmmqData = await getInfoEpmmqFromDb();
  const pdfData = await formatDataForPdf(epmmqData, invoice);

  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "invoice_template.html"
  );
  let html = await fs.readFile(templatePath, "utf8");

  Object.entries(pdfData).forEach(([key, value]) => {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    html = html.replace(pattern, String(value ?? ""));
  });

  // Generar PDF con Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
};

const getInfoEpmmqFromDb = async () => {
  const query = `SELECT * FROM concessi`;

  try {
    const [row] = await db.query(query);
    if (!Array.isArray(row) || row.length === 0) {
      throw new Error("No se encontraron registros en la tabla concessi");
    }
    const epmmqData: Epmmq = row[0] as Epmmq;
    return epmmqData;
  } catch (error) {
    console.error("Error al consultar a concessi:", error);
    throw new Error("No se pudo obtener datos de EPMMQ desde la base de datos");
  }
};


interface Params {
  documentId: string;
  dateStart: string;
  dateEnd: string;
}

export interface Invoice {
  id: number;
  account_razon: string;
  account_fiscal_id: string;
  chs_data_dat: Date;
  invoice_number: string;
  ce_ca: string;
  fecha_autorizacion: Date;
  cashmov_ope: string;
  cashmov_cant: number;
  cashmov_des: string;
  cashmov_imp: string;
  for_amt: string;
  account_dir: null;
  account_email: string;
  paymod: string;
}

export interface Epmmq {
  ID: number;
  CONCESSION_CODE: string;
  CONCESSION_NAM: string;
  FISCAL_ID: string;
  ADDR_DES: string;
  PHONE: string;
  SCN_PHONE: string;
}

// ========================================================
// ========================================================
// ========================================================
// CON PAGINACION

// import { db } from "../config/db";

// type Params = {
//   documentId: string;
//   dateStart: string;
//   dateEnd: string;
//   page?: number;
//   limit?: number;
// };

// type Invoice = {
//   id: number;
//   account_razon: string;
//   account_fiscal_id: string;
//   chs_data_dat: string;
//   invoice_number: string;
//   ce_ca: string;
//   fecha_autorizacion: string;
//   cashmov_ope: string;
//   cashmov_cant: number;
//   cashmov_des: string;
//   cashmov_imp: number;
//   for_amt: number;
//   account_dir: string;
//   account_email: string;
//   paymod: string;
// };

// export const getAllInvoices = async (params: Params): Promise<Invoice[]> => {
//   const {
//     documentId,
//     dateStart,
//     dateEnd,
//     page = 1,
//     limit = 5, // Valor por defecto
//   } = params;

//   const offset = (page - 1) * limit;

//   const query = `
//     SELECT
//       sri.id,
//       sri.account_razon,
//       sri.account_fiscal_id,
//       sri.chs_data_dat,
//       CONCAT(sri.ce_serie, '-', sri.ce_secuencial) AS invoice_number,
//       sri.ce_ca,
//       sri.fecha_autorizacion,
//       sri.cashmov_ope,
//       sri.cashmov_cant,
//       sri.cashmov_des,
//       sri.cashmov_imp,
//       sri.for_amt,
//       sri.account_dir,
//       sri.account_email,
//       CONCAT(sri.paymod_code, ' - ', sri.paymod_des) AS paymod
//     FROM srimvmn sri
//     WHERE sri.cashmov_type = '01'
//       AND sri.account_fiscal_id = ?
//       AND sri.chs_data_dat BETWEEN ? AND ?
//     ORDER BY sri.chs_data_dat DESC
//     LIMIT ?
//     OFFSET ?;
//   `;

//   try {
//     const [rows] = await db.query(query, [
//       documentId,
//       dateStart,
//       dateEnd,
//       limit,
//       offset,
//     ]);
//     return rows as Invoice[];
//   } catch (error) {
//     console.error("Error al consultar las facturas:", error);
//     throw new Error("No se pudo obtener las facturas desde la base de datos");
//   }
// };
