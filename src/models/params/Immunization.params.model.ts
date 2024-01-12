import { MedicationParameters } from './Medication.params.model';
import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter, StringSearchParameter } from './Search.params.model';

// Immunization Parameters
export enum ImmunizationParameters {
  Date = 'org.hl7.fhir.http.Immunization.date',
  Identifier = 'org.hl7.fhir.http.Immunization.identifier',
  Location = 'org.hl7.fhir.http.Immunization.location',
  LotNumber = 'org.hl7.fhir.http.Immunization.lot-number',
  Manufacturer = 'org.hl7.fhir.http.Immunization.manufacturer',
  Patient = 'org.hl7.fhir.http.Immunization.patient',
  Performer = 'org.hl7.fhir.http.Immunization.performer',
  Reaction = 'org.hl7.fhir.http.Immunization.reaction',
  Status = 'org.hl7.fhir.http.Immunization.status',
  VaccineCode = 'org.hl7.fhir.http.Immunization.vaccine-code',
  ManufacturerDisplay = 'org.hl7.fhir.http.Immunization.manufacturer-display',
  TargetDisease = 'org.hl7.fhir.http.Immunization.target-disease',
}
 
