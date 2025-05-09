import type { Request, Response } from "express";
import { getAllInvoices } from "../../services/invoice.service";

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { documentId, dateStart, dateEnd } = req.query;
    const dateTimeStart = `${dateStart} 00:00:00`;
    const dateTimeEnd = `${dateEnd} 23:59:59`;
    console.log("--->", {documentId, dateTimeStart, dateTimeEnd});
    if (documentId) {
      await getAllInvoices({
        documentId: documentId.toString(),
        dateStart: dateTimeStart,
        dateEnd: dateTimeEnd,
      });
    }
  } catch (error) {
    console.log(`error ${error}`);
  }
};
