import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter } from './SearchParamsModel';

// DetectedIssue Parameters
export enum DetectedIssueParameters {
    Author = 'author',
    Code = 'code',
    Identified = 'identified',
    Identifier = 'identifier',
    Implicated = 'implicated',
    Patient = 'patient',
    Status = 'status',
  }
  
  // DetectedIssue Resource Interface
export interface DetectedIssueResource {
  [DetectedIssueParameters.Author]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Code]?: TokenSearchParameter;
  [DetectedIssueParameters.Identified]?: DateSearchParameter;
  [DetectedIssueParameters.Identifier]?: TokenSearchParameter;
  [DetectedIssueParameters.Implicated]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Patient]?: ReferenceSearchParameter;
  [DetectedIssueParameters.Status]?: TokenSearchParameter;
}
