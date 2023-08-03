import { URLSearchParams } from 'url';

// DiagnosticReport Parameters
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
  
  // DiagnosticReport Class
  export class DiagnosticReport {
    resourceData: DiagnosticReportResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in DiagnosticReportParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case DiagnosticReportParameters.BasedOn:
            case DiagnosticReportParameters.Category:
            case DiagnosticReportParameters.Code:
            case DiagnosticReportParameters.Encounter:
            case DiagnosticReportParameters.ImagingStudy:
            case DiagnosticReportParameters.Patient:
            case DiagnosticReportParameters.Performer:
            case DiagnosticReportParameters.Result:
            case DiagnosticReportParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case DiagnosticReportParameters.Date:
              parameter = parseDateParameter(value);
              break;
            case DiagnosticReportParameters.Identifier:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['DiagnosticReport'];
          (this.resourceData as any)[key as keyof DiagnosticReportResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: DiagnosticReportResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  