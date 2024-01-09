import { ReferenceSearchParameter, TokenSearchParameter } from './SearchParamsModel';

// Encounter Parameters
export enum EncounterParameters {
    Appointment = 'org.hl7.fhir.http.encounter.appointment',
    Class = 'org.hl7.fhir.http.encounter.class',
    Diagnosis = 'org.hl7.fhir.http.encounter.diagnosis',
    EpisodeOfCare = 'org.hl7.fhir.http.encounter.episode-of-care',
    Identifier = 'org.hl7.fhir.http.encounter.identifier',
    Location = 'org.hl7.fhir.http.encounter.location',
    Participant = 'org.hl7.fhir.http.encounter.participant',
    Patient = 'org.hl7.fhir.http.encounter.patient',
    ReasonCode = 'org.hl7.fhir.http.encounter.reason-code',
    ReasonReference = 'org.hl7.fhir.http.encounter.reason-reference',
    ServiceProvider = 'org.hl7.fhir.http.encounter.service-provider',
    Status = 'org.hl7.fhir.http.encounter.status',
    Type = 'org.hl7.fhir.http.encounter.type',
  }
  
  // Encounter Resource Interface
export interface EncounterTemplateFHIR {
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
 