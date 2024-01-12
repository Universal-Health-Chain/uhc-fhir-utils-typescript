import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from './Search.params.model';

// Create the TypeScript enumerator for the HTTP parameters of the Appointment resource
export enum AppointmentParameters {
  Actor = 'org.hl7.fhir.http.Appointment.actor',
  Date = 'org.hl7.fhir.http.Appointment.date',
  Identifier = 'org.hl7.fhir.http.Appointment.identifier',
  Location = 'org.hl7.fhir.http.Appointment.location',
  PartStatus = 'org.hl7.fhir.http.Appointment.part-status',
  Patient = 'org.hl7.fhir.http.Appointment.patient',
  Practitioner = 'org.hl7.fhir.http.Appointment.practitioner',
  ServiceType = 'org.hl7.fhir.http.Appointment.service-type',
  Status = 'org.hl7.fhir.http.Appointment.status',
  Specialty = 'org.hl7.fhir.http.Appointment.specialty',
  }
