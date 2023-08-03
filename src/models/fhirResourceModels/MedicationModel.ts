import { URLSearchParams } from 'url';

// Medication Parameters
export enum MedicationParameters {
    Code = 'code',
    Identifier = 'identifier',
    Manufacturer = 'manufacturer',
    Status = 'status',
  }
  
  // Medication Resource Interface
  export interface MedicationResource {
    [MedicationParameters.Code]?: TokenSearchParameter;
    [MedicationParameters.Identifier]?: TokenSearchParameter;
    [MedicationParameters.Manufacturer]?: ReferenceSearchParameter;
    [MedicationParameters.Status]?: TokenSearchParameter;
  }
  
  // Medication Class
  // Helper function to parse search parameter based on type
function parseMedicationParameter(
    key: MedicationParameters,
    value: string
  ): SearchParameter {
    switch (key) {
      case MedicationParameters.Code:
      case MedicationParameters.Identifier:
      case MedicationParameters.Status:
        return parseTokenParameter(value);
      case MedicationParameters.Manufacturer:
        return parseReferenceParameter(value);
      default:
        throw new Error(`Unsupported parameter: ${key}`);
    }
  }
  // Medication Class
export class Medication {
    resourceData: MedicationResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in MedicationParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case MedicationParameters.Code:
            case MedicationParameters.Identifier:
            case MedicationParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case MedicationParameters.Manufacturer:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Medication'];
          (this.resourceData as any)[key as keyof MedicationResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: MedicationResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  