import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from './SearchParamsModel';

// Create the TypeScript enumerator for the HTTP parameters of the Appointment resource
export enum AppointmentParameters {
  Actor = 'org.hl7.fhir.http.appointment.actor',
  Date = 'org.hl7.fhir.http.appointment.date',
  Identifier = 'org.hl7.fhir.http.appointment.identifier',
  Location = 'org.hl7.fhir.http.appointment.location',
  PartStatus = 'org.hl7.fhir.http.appointment.part-status',
  Patient = 'org.hl7.fhir.http.appointment.patient',
  Practitioner = 'org.hl7.fhir.http.appointment.practitioner',
  ServiceType = 'org.hl7.fhir.http.appointment.service-type',
  Status = 'org.hl7.fhir.http.appointment.status',
  Specialty = 'org.hl7.fhir.http.appointment.specialty',
  }
  
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
