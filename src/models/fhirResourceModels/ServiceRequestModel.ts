import { URLSearchParams } from 'url';

// ServiceRequest Parameters
export enum ServiceRequestParameters {
    AuthoredOn = 'authored-on',
    Category = 'category',
    Code = 'code',
    Encounter = 'encounter',
    Identifier = 'identifier',
    OccurrenceDate = 'occurrence-date',
    Patient = 'patient',
    Performer = 'performer',
    ReasonCode = 'reason-code',
    ReasonReference = 'reason-reference',
    Status = 'status',
  }
  
  // ServiceRequest Resource Interface
  export interface ServiceRequestResource {
    [ServiceRequestParameters.AuthoredOn]?: DateSearchParameter;
    [ServiceRequestParameters.Category]?: TokenSearchParameter;
    [ServiceRequestParameters.Code]?: TokenSearchParameter;
    [ServiceRequestParameters.Encounter]?: ReferenceSearchParameter;
    [ServiceRequestParameters.Identifier]?: TokenSearchParameter;
    [ServiceRequestParameters.OccurrenceDate]?: DateSearchParameter;
    [ServiceRequestParameters.Patient]?: ReferenceSearchParameter;
    [ServiceRequestParameters.Performer]?: ReferenceSearchParameter;
    [ServiceRequestParameters.ReasonCode]?: TokenSearchParameter;
    [ServiceRequestParameters.ReasonReference]?: ReferenceSearchParameter;
    [ServiceRequestParameters.Status]?: TokenSearchParameter;
  }
  
  // ServiceRequest Class
  export class ServiceRequest {
    resourceData: ServiceRequestResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ServiceRequestParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ServiceRequestParameters.AuthoredOn:
            case ServiceRequestParameters.Category:
            case ServiceRequestParameters.Code:
            case ServiceRequestParameters.Encounter:
            case ServiceRequestParameters.Identifier:
            case ServiceRequestParameters.OccurrenceDate:
            case ServiceRequestParameters.Patient:
            case ServiceRequestParameters.Performer:
            case ServiceRequestParameters.ReasonCode:
            case ServiceRequestParameters.ReasonReference:
            case ServiceRequestParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['ServiceRequest'];
          (this.resourceData as any)[key as keyof ServiceRequestResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: ServiceRequestResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  