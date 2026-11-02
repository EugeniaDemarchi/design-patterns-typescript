import { ReportService } from "./before/reportSystem.before";

const service = new ReportService();

console.log(service.generate("Ventas de agosto: $150.000", "pdf"));
console.log(service.generate("Ventas de agosto: $150.000", "excel"));
console.log(service.generate("Ventas de agosto: $150.000", "csv"));

import { ReportService as ReportServiceAfter } from "./after/ReportService";

const serviceAfter = new ReportServiceAfter();

console.log(serviceAfter.generate("Ventas de agosto: $150.000", "pdf"));
console.log(serviceAfter.generate("Ventas de agosto: $150.000", "excel"));
console.log(serviceAfter.generate("Ventas de agosto: $150.000", "csv"));
console.log(serviceAfter.generate("Ventas de agosto: $150.000", "html"));
