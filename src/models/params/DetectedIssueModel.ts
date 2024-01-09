import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter } from './SearchParamsModel';

// DetectedIssue Parameters
export enum DetectedIssueParameters {
    Author = 'org.hl7.fhir.http.detected-issue.author',
    Code = 'org.hl7.fhir.http.detected-issue.code',
    Identified = 'org.hl7.fhir.http.detected-issue.identified',
    Identifier = 'org.hl7.fhir.http.detected-issue.identifier',
    Implicated = 'org.hl7.fhir.http.detected-issue.implicated',
    Patient = 'org.hl7.fhir.http.detected-issue.patient',
    Status = 'org.hl7.fhir.http.detected-issue.status',
  }
  
  // DetectedIssue Resource Interface
export interface DetectedIssueTemplateFHIR {
  [DetectedIssueParameters.Author]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Code]?: TokenSearchParameter;
  [DetectedIssueParameters.Identified]?: DateSearchParameter;
  [DetectedIssueParameters.Identifier]?: TokenSearchParameter;
  [DetectedIssueParameters.Implicated]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Patient]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Status]?: TokenSearchParameter;
}
