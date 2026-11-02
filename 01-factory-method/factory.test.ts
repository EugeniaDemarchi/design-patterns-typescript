import { describe, expect, it } from "vitest";
import { ReportFactory } from "./src/after/ReportFactory";
import { ReportService } from "./src/after/ReportService";
import { PDFReport } from "./src/after/reports/PDFReport";
import { HTMLReport } from "./src/after/reports/HTMLReport";

describe("Factory Method — ReportFactory", () => {
  it("creates the concrete report for each format", () => {
    expect(ReportFactory.create("pdf")).toBeInstanceOf(PDFReport);
    expect(ReportFactory.create("html")).toBeInstanceOf(HTMLReport);
  });

  it("rejects unsupported formats", () => {
    expect(() => ReportFactory.create("docx")).toThrow("Formato no soportado");
  });
});

describe("ReportService depends only on the Report interface", () => {
  const service = new ReportService();

  it.each([
    ["pdf", "[PDF]"],
    ["excel", "[Excel]"],
    ["csv", "[CSV]"],
    ["html", "<html>"],
  ])("generates a %s report with header and data", (format, prefix) => {
    const output = service.generate("Ventas: $150.000", format);
    expect(output.startsWith(prefix)).toBe(true);
    expect(output).toContain("Reporte Mensual");
    expect(output).toContain("Ventas: $150.000");
  });
});
