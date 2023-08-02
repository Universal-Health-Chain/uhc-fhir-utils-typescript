import { URLSearchParams } from 'url';

// Observation Parameters
export enum ObservationParameters {
    BasedOn = 'based-on',
    Category = 'category',
    Code = 'code',
    Date = 'date',
    Encounter = 'encounter',
    Identifier = 'identifier',
    Method = 'method',
    Patient = 'patient',
    Performer = 'performer',
    ValueConcept = 'value-concept',
    ValueDate = 'value-date',
    ValueQuantity = 'value-quantity',
    ValueString = 'value-string',
    Status = 'status',
  }
  
  // Observation Resource Interface
  export interface ObservationResource {
    [ObservationParameters.BasedOn]?: ReferenceSearchParameter;
    [ObservationParameters.Category]?: TokenSearchParameter;
    [ObservationParameters.Code]?: TokenSearchParameter;
    [ObservationParameters.Date]?: DateSearchParameter;
    [ObservationParameters.Encounter]?: ReferenceSearchParameter;
    [ObservationParameters.Identifier]?: TokenSearchParameter;
    [ObservationParameters.Method]?: TokenSearchParameter;
    [ObservationParameters.Patient]?: ReferenceSearchParameter;
    [ObservationParameters.Performer]?: ReferenceSearchParameter;
    [ObservationParameters.ValueConcept]?: TokenSearchParameter;
    [ObservationParameters.ValueDate]?: DateSearchParameter;
    [ObservationParameters.ValueQuantity]?: QuantitySearchParameter;
    [ObservationParameters.ValueString]?: StringSearchParameter;
    [ObservationParameters.Status]?: TokenSearchParameter;
  }
  
  // Observation Class
  export class Observation {
    resourceData: ObservationResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ObservationParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ObservationParameters.BasedOn:
            case ObservationParameters.Category:
            case ObservationParameters.Code:
            case ObservationParameters.Encounter:
            case ObservationParameters.Identifier:
            case ObservationParameters.Method:
            case ObservationParameters.Patient:
            case ObservationParameters.Performer:
            case ObservationParameters.ValueConcept:
            case ObservationParameters.ValueString:
            case ObservationParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case ObservationParameters.Date:
            case ObservationParameters.ValueDate:
              parameter = parseDateParameter(value);
              break;
            case ObservationParameters.ValueQuantity:
              parameter = parseQuantityParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Observation'];
          this.resourceData[key as keyof ObservationResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: ObservationResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  