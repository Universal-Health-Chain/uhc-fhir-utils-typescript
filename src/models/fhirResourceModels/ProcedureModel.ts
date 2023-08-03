import { URLSearchParams } from 'url';

// Procedure Parameters
export enum ProcedureParameters {
    BasedOn = 'based-on',
    Category = 'category',
    Code = 'code',
    Date = 'date',
    Encounter = 'encounter',
    Identifier = 'identifier',
    Location = 'location',
    Patient = 'patient',
    Performer = 'performer',
    ReasonCode = 'reason-code',
    ReasonReference = 'reason-reference',
    Status = 'status',
  }
  
  // Procedure Resource Interface
  export interface ProcedureResource {
    [ProcedureParameters.BasedOn]?: ReferenceSearchParameter;
    [ProcedureParameters.Category]?: TokenSearchParameter;
    [ProcedureParameters.Code]?: TokenSearchParameter;
    [ProcedureParameters.Date]?: DateSearchParameter;
    [ProcedureParameters.Encounter]?: ReferenceSearchParameter;
    [ProcedureParameters.Identifier]?: TokenSearchParameter;
    [ProcedureParameters.Location]?: ReferenceSearchParameter;
    [ProcedureParameters.Patient]?: ReferenceSearchParameter;
    [ProcedureParameters.Performer]?: ReferenceSearchParameter;
    [ProcedureParameters.ReasonCode]?: TokenSearchParameter;
    [ProcedureParameters.ReasonReference]?: ReferenceSearchParameter;
    [ProcedureParameters.Status]?: TokenSearchParameter;
  }
  
  // Procedure Class
  export class Procedure {
    resourceData: ProcedureResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ProcedureParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ProcedureParameters.BasedOn:
            case ProcedureParameters.Category:
            case ProcedureParameters.Code:
            case ProcedureParameters.Encounter:
            case ProcedureParameters.Identifier:
            case ProcedureParameters.Location:
            case ProcedureParameters.Patient:
            case ProcedureParameters.Performer:
            case ProcedureParameters.ReasonCode:
            case ProcedureParameters.ReasonReference:
            case ProcedureParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case ProcedureParameters.Date:
              parameter = parseDateParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Procedure'];
          (this.resourceData as any)[key as keyof ProcedureResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: ProcedureResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  