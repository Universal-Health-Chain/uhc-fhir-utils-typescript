import { URLSearchParams } from 'url';

// Specimen Parameters
export enum SpecimenParameters {
    AccessionIdentifier = 'accession-identifier',
    CollectionDate = 'collection-date',
    ContainerIdentifier = 'container-identifier',
    Identifier = 'identifier',
    Parent = 'parent',
    Patient = 'patient',
    Status = 'status',
    Type = 'type',
  }
  
  // Specimen Resource Interface
  export interface SpecimenResource {
    [SpecimenParameters.AccessionIdentifier]?: TokenSearchParameter;
    [SpecimenParameters.CollectionDate]?: DateSearchParameter;
    [SpecimenParameters.ContainerIdentifier]?: TokenSearchParameter;
    [SpecimenParameters.Identifier]?: TokenSearchParameter;
    [SpecimenParameters.Parent]?: ReferenceSearchParameter;
    [SpecimenParameters.Patient]?: ReferenceSearchParameter;
    [SpecimenParameters.Status]?: TokenSearchParameter;
    [SpecimenParameters.Type]?: TokenSearchParameter;
  }
  
  // Specimen Class
  export class Specimen {
    resourceData: SpecimenResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in SpecimenParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case SpecimenParameters.AccessionIdentifier:
            case SpecimenParameters.ContainerIdentifier:
            case SpecimenParameters.Identifier:
            case SpecimenParameters.Patient:
            case SpecimenParameters.Status:
            case SpecimenParameters.Type:
              parameter = parseTokenParameter(value);
              break;
            case SpecimenParameters.CollectionDate:
              parameter = parseDateParameter(value);
              break;
            case SpecimenParameters.Parent:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Specimen'];
          this.resourceData[key as keyof SpecimenResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: SpecimenResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  