import { Epmmq, Invoice } from "../services/invoice.service";
import fs from "fs/promises";
import path from "path";
import dayjs from "dayjs";

export const formatDataForPdf = async (epmmqData: Epmmq, invoice: Invoice) => {
  const logoPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "assets",
    "image2.png"
  );
  const imageBuffer = await fs.readFile(logoPath);
  const base64Logo = `data:image/png;base64,${imageBuffer.toString("base64")}`;
  const formatDataForPdf = {
    logo: base64Logo,
    concessi_fiscal_id: epmmqData.FISCAL_ID,
    factura_number: invoice.invoice_number,
    srimvmn_ce_ca: invoice.ce_ca,
    fecha_hora_autorizacion: dayjs(invoice.fecha_autorizacion).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    ambiente: "PRODUCCION",
    emision: "NORMAL",
    barcode: "",
    razon_social: epmmqData.CONCESSION_NAM,
    nombre_comercial: epmmqData.CONCESSION_NAM,
    dir_matriz: epmmqData.ADDR_DES,
    contribuyente_especial: "0162",
    obligado_contabilidad: "SI",
    contribuyente_especial_2: "162",
    account_razon: invoice.account_razon,
    account_fiscal_id: invoice.account_fiscal_id,
    chs_data_dat: invoice.chs_data_dat,
    account_dir: invoice.account_dir,
    for_amt: invoice.for_amt,
    account_telefono: "",
    account_email: invoice.account_email,
    observacion: "---",
    paymod_desc: invoice.paymod,
    fecha_vencimiento: "---",
    l1_1: invoice.cashmov_ope,
    l1_2: "--",
    l1_3: invoice.cashmov_cant,
    l1_4: invoice.cashmov_des,
    l1_5: invoice.cashmov_imp,
    l1_6: "0,00",
    l1_7: invoice.for_amt,
  };
  return formatDataForPdf;
};
