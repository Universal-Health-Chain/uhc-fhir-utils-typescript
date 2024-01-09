import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// ServiceRequest Parameters
export enum ServiceRequestParameters {
    AuthoredOn = 'org.hl7.fhir.http.service-request.authored-on',
    Category = 'org.hl7.fhir.http.service-request.category',
    Code = 'org.hl7.fhir.http.service-request.code',
    Encounter = 'org.hl7.fhir.http.service-request.encounter',
    Identifier = 'org.hl7.fhir.http.service-request.identifier',
    OccurrenceDate = 'org.hl7.fhir.http.service-request.occurrence-date',
    Patient = 'org.hl7.fhir.http.service-request.patient',
    Performer = 'org.hl7.fhir.http.service-request.performer',
    ReasonCode = 'org.hl7.fhir.http.service-request.reason-code',
    ReasonReference = 'org.hl7.fhir.http.service-request.reason-reference',
    Status = 'org.hl7.fhir.http.service-request.status',
    Subject = 'org.hl7.fhir.http.service-request.subject'
  }
  
// ServiceRequest Resource Interface
export interface ServiceRequestTemplateFHIR {
  [ServiceRequestParameters.AuthoredOn]?: DateSearchParameter;
  [ServiceRequestParameters.Category]?: TokenSearchParameter;
  [ServiceRequestParameters.Code]?: TokenSearchParameter;
  [ServiceRequestParameters.Encounter]?: ReferenceSearchParameter;
  [ServiceRequestParameters.Identifier]?: TokenSearchParameter;
  [ServiceRequestParameters.OccurrenceDate]?: DateSearchParameter;
  [ServiceRequestParameters.Patient]?: ReferenceSearchParameter;
  [ServiceRequestParameters.Performer]?: ReferenceSearchParameter;
  [ServiceRequestParameters.ReasonCode]?: TokenSearchParameter;
  [ServiceRequestParameters.ReasonReference]?: ReferenceSearchParameter;
  [ServiceRequestParameters.Subject]?: ReferenceSearchParameter;
  [ServiceRequestParameters.Status]?: TokenSearchParameter;
}
  