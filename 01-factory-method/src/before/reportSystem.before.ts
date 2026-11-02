class PDFReport {
  private data: string = "";
  private header: string = "";
  private footer: string = "";

  setData(data: string): void {
    this.data = data;
  }

  addHeader(text: string): void {
    this.header = text;
  }

  addFooter(text: string): void {
    this.footer = text;
  }

  render(): void {}

  getOutput(): string {
    return `[PDF]\n${this.header}\n${this.data}\n${this.footer}`;
  }
}

class ExcelReport {
  private data: string = "";
  private header: string = "";
  private footer: string = "";

  setData(data: string): void {
    this.data = data;
  }

  addHeader(text: string): void {
    this.header = text;
  }

  addFooter(text: string): void {
    this.footer = text;
  }

  render(): void {}

  getOutput(): string {
    return `[Excel]\n${this.header}\n${this.data}\n${this.footer}`;
  }
}

class CSVReport {
  private data: string = "";
  private header: string = "";
  private footer: string = "";

  setData(data: string): void {
    this.data = data;
  }

  addHeader(text: string): void {
    this.header = text;
  }

  addFooter(text: string): void {
    this.footer = text;
  }

  render(): void {}

  getOutput(): string {
    return `[CSV]\n${this.header}\n${this.data}\n${this.footer}`;
  }
}

export class ReportService {
  generate(data: string, formatType: string): string {
    let report: any;

    if (formatType === "pdf") {
      report = new PDFReport();
    } else if (formatType === "excel") {
      report = new ExcelReport();
    } else if (formatType === "csv") {
      report = new CSVReport();
    } else {
      throw new Error("Formato no soportado");
    }

    // --- lógica de uso: igual sin importar qué tipo de reporte sea ---
    report.setData(data);
    report.addHeader("Reporte Mensual");
    report.addFooter("Generado el " + new Date().toLocaleDateString());
    report.render();
    return report.getOutput();
  }
}
