import { AppointmentParameters } from '../params';
import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from '../params/Search.params.model';


  // Create the TypeScript interface for the Appointment resource using the enumerator and the search parameter types
export interface AppointmentTemplateFHIR {
  [AppointmentParameters.Actor]?: ReferenceSearchParameter;
  [AppointmentParameters.Date]?: DateSearchParameter;
  [AppointmentParameters.Identifier]?: TokenSearchParameter;
  [AppointmentParameters.Location]?: ReferenceSearchParameter;
  [AppointmentParameters.PartStatus]?: TokenSearchParameter;
  [AppointmentParameters.Patient]?: ReferenceSearchParameter;
  [AppointmentParameters.Practitioner]?: ReferenceSearchParameter;
  [AppointmentParameters.ServiceType]?: TokenSearchParameter;
  [AppointmentParameters.Status]?: TokenSearchParameter;
}
