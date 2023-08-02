import { URLSearchParams } from 'url';

// Encounter Parameters
export enum EncounterParameters {
    Appointment = 'appointment',
    Class = 'class',
    Diagnosis = 'diagnosis',
    EpisodeOfCare = 'episode-of-care',
    Identifier = 'identifier',
    Location = 'location',
    Participant = 'participant',
    Patient = 'patient',
    ReasonCode = 'reason-code',
    ReasonReference = 'reason-reference',
    ServiceProvider = 'service-provider',
    Status = 'status',
    Type = 'type',
  }
  
  // Encounter Resource Interface
  export interface EncounterResource {
    [EncounterParameters.Appointment]?: ReferenceSearchParameter;
    [EncounterParameters.Class]?: TokenSearchParameter;
    [EncounterParameters.Diagnosis]?: ReferenceSearchParameter;
    [EncounterParameters.EpisodeOfCare]?: ReferenceSearchParameter;
    [EncounterParameters.Identifier]?: TokenSearchParameter;
    [EncounterParameters.Location]?: ReferenceSearchParameter;
    [EncounterParameters.Participant]?: ReferenceSearchParameter;
    [EncounterParameters.Patient]?: ReferenceSearchParameter;
    [EncounterParameters.ReasonCode]?: TokenSearchParameter;
    [EncounterParameters.ReasonReference]?: ReferenceSearchParameter;
    [EncounterParameters.ServiceProvider]?: ReferenceSearchParameter;
    [EncounterParameters.Status]?: TokenSearchParameter;
    [EncounterParameters.Type]?: TokenSearchParameter;
  }
  
  // Encounter Class
  export class Encounter {
    resourceData: EncounterResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in EncounterParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case EncounterParameters.Appointment:
            case EncounterParameters.Class:
            case EncounterParameters.Diagnosis:
            case EncounterParameters.EpisodeOfCare:
            case EncounterParameters.Location:
            case EncounterParameters.Participant:
            case EncounterParameters.Patient:
            case EncounterParameters.ReasonCode:
            case EncounterParameters.ReasonReference:
            case EncounterParameters.ServiceProvider:
            case EncounterParameters.Status:
            case EncounterParameters.Type:
              parameter = parseTokenParameter(value);
              break;
            case EncounterParameters.Identifier:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Encounter'];
          this.resourceData[key as keyof EncounterResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: EncounterResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  