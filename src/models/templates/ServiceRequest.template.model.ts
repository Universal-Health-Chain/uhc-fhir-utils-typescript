import { ServiceRequestParameters } from '../params';
import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter } from '../params/Search.params.model';
 
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
  