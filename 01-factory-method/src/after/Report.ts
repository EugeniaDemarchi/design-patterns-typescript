export interface Report {
  setData(data: string): void;
  addHeader(text: string): void;
  addFooter(text: string): void;
  render(): void;
  getOutput(): string;
}
