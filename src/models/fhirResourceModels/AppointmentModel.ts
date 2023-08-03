import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from './SearchParamsModel';

// Create the TypeScript enumerator for the HTTP parameters of the Appointment resource
export enum AppointmentParameters {
    Actor = 'actor',
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    PartStatus = 'part-status',
    Patient = 'patient',
    Practitioner = 'practitioner',
    ServiceType = 'service-type',
    Status = 'status',
  }
  
  // Create the TypeScript interface for the Appointment resource using the enumerator and the search parameter types
export interface AppointmentResource {
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
