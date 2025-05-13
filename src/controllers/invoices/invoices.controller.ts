import type { Request, Response } from "express";
import {
  generatePdfService,
  getAllInvoicesService,
} from "../../services/invoice.service";

export const getAllInvoicesController = async (req: Request, res: Response) => {
  try {
    const { documentId, dateStart, dateEnd } = req.query;

    if (!documentId || !dateStart || !dateEnd) {
      res.status(400).json({
        success: false,
        message: "Faltan parámetros documentId, dateStart, dateEnd",
      });
    }

    const dateTimeStart = `${dateStart} 00:00:00`;
    const dateTimeEnd = `${dateEnd} 23:59:59`;

    const invoices = await getAllInvoicesService({
      documentId: documentId?.toString()!,
      dateStart: dateTimeStart,
      dateEnd: dateTimeEnd,
    });

    res.status(200).json({
      success: true,
      message: "Facturas obtenidas correctamente",
      data: invoices,
    });
  } catch (error) {
    console.error(`Error al obtener facturas: ${error}`);
    res.status(500).json({
      success: false,
      message: "Error del servidor al obtener las facturas",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const generatePdfController = async (req: Request, res: Response) => {
  try {
    const invoice = req.body.invoice;
    if (!invoice) {
      res.status(400).json({
        success: false,
        message: "Datos de factura no recibidos",
      });
    }

    const pdf = await generatePdfService(invoice);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoice_number}-${invoice.account_fiscal_id}.pdf`
    );
    //aqui falta agregar algún identificador de factura ${invoice.invoice_number}
    res.send(pdf);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al generar el PDF",
        error: error instanceof Error ? error.message : error,
      });
  }
};

