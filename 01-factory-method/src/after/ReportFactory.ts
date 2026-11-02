import { Report } from "./Report";
import { PDFReport } from "./reports/PDFReport";
import { ExcelReport } from "./reports/ExcelReport";
import { CSVReport } from "./reports/CSVReport";
import { HTMLReport } from "./reports/HTMLReport";

/*
 * Factory Method resuelve que ReportService ya no conoce ni importa clases concretas:
 * la decisión de "qué instanciar" quedó aislada en ReportFactory, y ReportService solo
 * depende de la interfaz Report. Por eso HTMLReport se agregó sin tocar ReportService.
 * Elegí Factory Method y no Abstract Factory porque hay un solo tipo de producto (Report)
 * en variantes, no varias familias de objetos que deban combinarse entre sí.
 * Elegí Static Factory (no GoF estricto con jerarquía de creadores) porque lo único que
 * varía es QUÉ clase se instancia, no el comportamiento del creador: armar una jerarquía
 * de ReportService por formato sería sobre-ingeniería para un caso tan simple.
 */

export class ReportFactory {
  static create(formatType: string): Report {
    if (formatType === "pdf") {
      return new PDFReport();
    } else if (formatType === "excel") {
      return new ExcelReport();
    } else if (formatType === "csv") {
      return new CSVReport();
    } else if (formatType === "html") {
      return new HTMLReport();
    } else {
      throw new Error("Formato no soportado");
    }
  }
}
