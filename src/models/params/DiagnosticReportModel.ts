import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter } from './SearchParamsModel';

export enum DiagnosticReportParameters {
    BasedOn = 'org.hl7.fhir.http.diagnostic-report.based-on',
    Category = 'org.hl7.fhir.http.diagnostic-report.category',
    Code = 'org.hl7.fhir.http.diagnostic-report.code',
    Date = 'org.hl7.fhir.http.diagnostic-report.date',
    Encounter = 'org.hl7.fhir.http.diagnostic-report.encounter',
    Identifier = 'org.hl7.fhir.http.diagnostic-report.identifier',
    ImagingStudy = 'org.hl7.fhir.http.diagnostic-report.imaging-study',
    Patient = 'org.hl7.fhir.http.diagnostic-report.patient',
    Performer = 'org.hl7.fhir.http.diagnostic-report.performer',
    Result = 'org.hl7.fhir.http.diagnostic-report.result',
    Status = 'org.hl7.fhir.http.diagnostic-report.status',
  }
  
  // DiagnosticReport Resource Interface
export interface DiagnosticReportTemplateFHIR {
  [DiagnosticReportParameters.BasedOn]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Category]?: TokenSearchParameter;
  [DiagnosticReportParameters.Code]?: TokenSearchParameter;
  [DiagnosticReportParameters.Date]?: DateSearchParameter;
  [DiagnosticReportParameters.Encounter]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Identifier]?: TokenSearchParameter;
  [DiagnosticReportParameters.ImagingStudy]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Patient]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Performer]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Result]?: ReferenceSearchParameter;
  [DiagnosticReportParameters.Status]?: TokenSearchParameter;
}
  
