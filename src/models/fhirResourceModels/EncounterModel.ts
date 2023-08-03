import { ReferenceSearchParameter, TokenSearchParameter } from './SearchParamsModel';

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
 