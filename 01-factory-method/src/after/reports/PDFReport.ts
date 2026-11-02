import { Report } from "../Report";

export class PDFReport implements Report {
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
