import { URLSearchParams } from 'url';

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
  
  // DetectedIssue Class
  export class DetectedIssue {
    resourceData: DetectedIssueResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in DetectedIssueParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case DetectedIssueParameters.Author:
            case DetectedIssueParameters.Code:
            case DetectedIssueParameters.Implicated:
            case DetectedIssueParameters.Patient:
            case DetectedIssueParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case DetectedIssueParameters.Identified:
              parameter = parseDateParameter(value);
              break;
            case DetectedIssueParameters.Identifier:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['DetectedIssue'];
          (this.resourceData as any)[key as keyof DetectedIssueResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: DetectedIssueResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  