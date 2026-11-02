import { Report } from "./Report";
import { ReportFactory } from "./ReportFactory";

export class ReportService {
  generate(data: string, formatType: string): string {
    const report: Report = ReportFactory.create(formatType);

    report.setData(data);
    report.addHeader("Reporte Mensual");
    report.addFooter("Generado el " + new Date().toLocaleDateString());
    report.render();
    return report.getOutput();
  }
}
