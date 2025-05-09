import { db } from "../config/db";

export const getAllInvoices = async (params: Params) => {
  try {
    const { documentId, dateStart, dateEnd } = params;
    const query = `
        #cabecera cliente
        select sri.id,sri.account_razon, sri.account_fiscal_id, sri.chs_data_dat,
        #cabecera sri
        concat(sri.ce_serie,'-',sri.ce_secuencial) as invoice_number, sri.ce_ca, sri.fecha_autorizacion,
        #detalle
        sri.cashmov_ope, sri.cashmov_cant, sri.cashmov_des, sri.cashmov_imp, sri.for_amt,
        #pie
        sri.account_dir, sri.account_email, concat(sri.paymod_code,' - ',sri.paymod_des) as paymod
        from srimvmn sri
        where sri.cashmov_type = '01'
        and sri.account_fiscal_id = ?
        and chs_data_dat between ? and ?
        order by chs_data_dat desc
        limit 5
        offset 0;
        `;
    const response = await db.query(query, [documentId, dateStart, dateEnd]);
    const invoicesData: Invoice[] = response[0] as Invoice[];
    console.log("esta es el resultado de mi query-->", {
      invoicesData,
      length: invoicesData.length,
    });
  } catch (error) {
    console.log(`error al realizar la consulta ${error}`);
  }
};

// QUERY COMPLETA
// hay la posibilidad de realizar paginado por cursor <------
// #cabecera cliente
// select sri.id,sri.account_razon, sri.account_fiscal_id, sri.chs_data_dat,
// #cabecera sri
// concat(sri.ce_serie,'-',sri.ce_secuencial) as invoice_number, sri.ce_ca, sri.fecha_autorizacion,
// #detalle
// sri.cashmov_ope, sri.cashmov_cant, sri.cashmov_des, sri.cashmov_imp, sri.for_amt,
// #pie
// sri.account_dir, sri.account_email, concat(sri.paymod_code,' - ',sri.paymod_des)
// from srimvmn sri
// where sri.cashmov_type = '01'
// and sri.account_fiscal_id = '1850039247' #1850039247
// and chs_data_dat between '2025-02-01 00:00:00' and '2025-03-30 23:59:59'
// order by chs_data_dat desc
// limit 5
// offset 0;

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
