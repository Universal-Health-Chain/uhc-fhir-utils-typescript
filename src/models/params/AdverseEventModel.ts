import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Create the TypeScript enumerator for the HTTP parameters of the AdverseEvent resource
export enum AdverseEventParameters {
  Category = 'org.hl7.fhir.http.adverse-event.category',
  Date = 'org.hl7.fhir.http.adverse-event.date',
  Identifier = 'org.hl7.fhir.http.adverse-event.identifier',
  Location = 'org.hl7.fhir.http.adverse-event.location',
  Reaction = 'org.hl7.fhir.http.adverse-event.reaction',
  Recorder = 'org.hl7.fhir.http.adverse-event.recorder',
  Seriousness = 'org.hl7.fhir.http.adverse-event.seriousness',
  Study = 'org.hl7.fhir.http.adverse-event.study',
  Subject = 'org.hl7.fhir.http.adverse-event.subject',
  Substance = 'org.hl7.fhir.http.adverse-event.substance',
  RecordedDate = 'org.hl7.fhir.http.adverse-event.recorder-date',
  ReferenceDocument = 'org.hl7.fhir.http.adverse-event.reference-document'
  }
  
  // Create the TypeScript interface for the AdverseEvent resource using the enumerator and the search parameter types
 export interface AdverseEventTemplateFHIR {
    [AdverseEventParameters.Category]?: TokenSearchParameter;
    [AdverseEventParameters.Date]?: DateSearchParameter;
    [AdverseEventParameters.Identifier]?: TokenSearchParameter;
    [AdverseEventParameters.Location]?: ReferenceSearchParameter;
    [AdverseEventParameters.Reaction]?: ReferenceSearchParameter;
    [AdverseEventParameters.Recorder]?: ReferenceSearchParameter;
    [AdverseEventParameters.Seriousness]?: TokenSearchParameter;
    [AdverseEventParameters.Study]?: ReferenceSearchParameter;
    [AdverseEventParameters.Subject]?: ReferenceSearchParameter;
    [AdverseEventParameters.Substance]?: ReferenceSearchParameter;
    [AdverseEventParameters.RecordedDate]?: DateSearchParameter;
    [AdverseEventParameters.ReferenceDocument]?: ReferenceSearchParameter;
  }
  

  // Create a class to store and manipulate the AdverseEvent resource
