export enum DiagnosticReportParameters {
    BasedOn = 'based-on',
    Category = 'category',
    Code = 'code',
    Date = 'date',
    Encounter = 'encounter',
    Identifier = 'identifier',
    ImagingStudy = 'imaging-study',
    Patient = 'patient',
    Performer = 'performer',
    Result = 'result',
    Status = 'status',
  }
  
  // DiagnosticReport Resource Interface
export interface DiagnosticReportResource {
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
  
