import { Report } from "../Report";

export class HTMLReport implements Report {
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
    return `<html><body><h1>${this.header}</h1><p>${this.data}</p><footer>${this.footer}</footer></body></html>`;
  }
}
