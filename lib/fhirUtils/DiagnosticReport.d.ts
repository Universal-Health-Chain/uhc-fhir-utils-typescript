import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class DiagnosticReport {
    constructor();
    getFhirAttachmentsInDiagnosticReport(diagnosticReport: R4.IDiagnosticReport): R4.IAttachment[];
}
export declare function getFhirAttachmentsInDiagnosticReport(diagnosticReport: R4.IDiagnosticReport): R4.IAttachment[];
