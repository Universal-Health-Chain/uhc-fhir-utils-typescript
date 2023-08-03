import { URLSearchParams } from 'url';

// Immunization Parameters
export enum ImmunizationParameters {
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    LotNumber = 'lot-number',
    Manufacturer = 'manufacturer',
    Patient = 'patient',
    Performer = 'performer',
    Reaction = 'reaction',
    Status = 'status',
    VaccineCode = 'vaccine-code',
  }
  
  // Immunization Resource Interface
  export interface ImmunizationResource {
    [ImmunizationParameters.Date]?: DateSearchParameter;
    [ImmunizationParameters.Identifier]?: TokenSearchParameter;
    [ImmunizationParameters.Location]?: ReferenceSearchParameter;
    [ImmunizationParameters.LotNumber]?: StringSearchParameter;
    [ImmunizationParameters.Manufacturer]?: ReferenceSearchParameter;
    [ImmunizationParameters.Patient]?: ReferenceSearchParameter;
    [ImmunizationParameters.Performer]?: ReferenceSearchParameter;
    [ImmunizationParameters.Reaction]?: ReferenceSearchParameter;
    [ImmunizationParameters.Status]?: TokenSearchParameter;
    [ImmunizationParameters.VaccineCode]?: TokenSearchParameter;
  }
  
  // Immunization Class
  export class Immunization {
    resourceData: ImmunizationResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ImmunizationParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ImmunizationParameters.Date:
            case ImmunizationParameters.LotNumber:
            case ImmunizationParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case ImmunizationParameters.Identifier:
              parameter = parseReferenceParameter(value);
              break;
            case ImmunizationParameters.Location:
            case ImmunizationParameters.Manufacturer:
            case ImmunizationParameters.Patient:
            case ImmunizationParameters.Performer:
            case ImmunizationParameters.Reaction:
            case ImmunizationParameters.VaccineCode:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Immunization'];
          (this.resourceData as any)[key as keyof ImmunizationResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: ImmunizationResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  