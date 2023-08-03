import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// ServiceRequest Parameters
export enum ServiceRequestParameters {
    AuthoredOn = 'authored-on',
    Category = 'category',
    Code = 'code',
    Encounter = 'encounter',
    Identifier = 'identifier',
    OccurrenceDate = 'occurrence-date',
    Patient = 'patient',
    Performer = 'performer',
    ReasonCode = 'reason-code',
    ReasonReference = 'reason-reference',
    Status = 'status',
  }
  
// ServiceRequest Resource Interface
export interface ServiceRequestResource {
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
  [ServiceRequestParameters.Status]?: TokenSearchParameter;
}
  