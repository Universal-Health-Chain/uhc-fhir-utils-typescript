import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './Search.params.model';

// Create the TypeScript enumerator for the HTTP parameters of the AdverseEvent resource
export enum AdverseEventParameters {
  Category = 'org.hl7.fhir.http.AdverseEvent.category',
  Date = 'org.hl7.fhir.http.AdverseEvent.date',
  Identifier = 'org.hl7.fhir.http.AdverseEvent.identifier',
  Location = 'org.hl7.fhir.http.AdverseEvent.location',
  Reaction = 'org.hl7.fhir.http.AdverseEvent.reaction',
  Recorder = 'org.hl7.fhir.http.AdverseEvent.recorder',
  Seriousness = 'org.hl7.fhir.http.AdverseEvent.seriousness',
  Study = 'org.hl7.fhir.http.AdverseEvent.study',
  Subject = 'org.hl7.fhir.http.AdverseEvent.subject',
  Substance = 'org.hl7.fhir.http.AdverseEvent.substance',
  RecordedDate = 'org.hl7.fhir.http.AdverseEvent.recorder-date',
  ReferenceDocument = 'org.hl7.fhir.http.AdverseEvent.reference-document'
  }
