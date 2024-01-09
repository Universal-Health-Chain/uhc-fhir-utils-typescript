import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter, StringSearchParameter } from './SearchParamsModel';

// Immunization Parameters
export enum ImmunizationParameters {
  Date = 'org.hl7.fhir.http.immunization.date',
  Identifier = 'org.hl7.fhir.http.immunization.identifier',
  Location = 'org.hl7.fhir.http.immunization.location',
  LotNumber = 'org.hl7.fhir.http.immunization.lot-number',
  Manufacturer = 'org.hl7.fhir.http.immunization.manufacturer',
  Patient = 'org.hl7.fhir.http.immunization.patient',
  Performer = 'org.hl7.fhir.http.immunization.performer',
  Reaction = 'org.hl7.fhir.http.immunization.reaction',
  Status = 'org.hl7.fhir.http.immunization.status',
  VaccineCode = 'org.hl7.fhir.http.immunization.vaccine-code',
  ManufacturerDisplay = 'org.hl7.fhir.http.immunization.manufacturer-display',
  TargetDisease = 'org.hl7.fhir.http.immunization.target-disease',
}
  
// Immunization Resource Interface
export interface ImmunizationTemplateFHIR {
  [ImmunizationParameters.Date]?: DateSearchParameter;
  [ImmunizationParameters.Identifier]?: TokenSearchParameter;
  [ImmunizationParameters.Location]?: ReferenceSearchParameter;
  [ImmunizationParameters.LotNumber]?: StringSearchParameter;
  [ImmunizationParameters.Manufacturer]?: ReferenceSearchParameter;
  [ImmunizationParameters.Patient]?: ReferenceSearchParameter;
  [ImmunizationParameters.Performer]?: ReferenceSearchParameter;
  [ImmunizationParameters.Reaction]?: ReferenceSearchParameter;
  [ImmunizationParameters.Status]?: TokenSearchParameter;
  [ImmunizationParameters.VaccineCode]?: TokenSearchParameter;
  [ImmunizationParameters.ManufacturerDisplay]?: ReferenceSearchParameter;
  [ImmunizationParameters.TargetDisease]?: TokenSearchParameter;
}
