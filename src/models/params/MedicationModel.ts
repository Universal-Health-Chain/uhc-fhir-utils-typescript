import {
  TokenSearchParameter,
  ReferenceSearchParameter,
  DateSearchParameter,
} from './SearchParamsModel';

// Medication Parameters
export enum MedicationParameters {
  Code = 'org.hl7.fhir.http.medication.code',
  Identifier = 'org.hl7.fhir.http.medication.identifier',
  Manufacturer = 'org.hl7.fhir.http.medication.manufacturer',
  Status = 'org.hl7.fhir.http.medication.status',
}

// Medication Resource Interface
export interface MedicationTemplateFHIR {
  [MedicationParameters.Code]?: TokenSearchParameter;
  [MedicationParameters.Identifier]?: TokenSearchParameter;
  [MedicationParameters.Manufacturer]?: ReferenceSearchParameter;
  [MedicationParameters.Status]?: TokenSearchParameter;
}

// MedicationStatement Parameters
export enum MedicationStatementParameters {
  Category = 'org.hl7.fhir.http.medication-statement.category',
  Medication = 'org.hl7.fhir.http.medication-statement.medication',
  Identifier = 'org.hl7.fhir.http.medication-statement.identifier',
  Patient = 'org.hl7.fhir.http.medication-statement.patient',
  Status = 'org.hl7.fhir.http.medication-statement.status',
  Subject = 'org.hl7.fhir.http.medication-statement.subject'
}

// MedicationStatement Resource Interface
export interface MedicationStatementTemplateFHIR {
  [MedicationStatementParameters.Category]?: TokenSearchParameter;
  [MedicationStatementParameters.Medication]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Identifier]?: TokenSearchParameter;
  [MedicationStatementParameters.Patient]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Subject]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Status]?: TokenSearchParameter;
}

// MedicationDispense Parameters
export enum MedicationDispenseParameters {
  Identifier = 'org.hl7.fhir.http.medication-dispense.identifier',
  Medication = 'org.hl7.fhir.http.medication-dispense.medication',
  Patient = 'org.hl7.fhir.http.medication-dispense.patient',
  Status = 'org.hl7.fhir.http.medication-dispense.status',
}

// MedicationDispense Resource Interface
export interface MedicationDispenseTemplateFHIR {
  [MedicationDispenseParameters.Identifier]?: TokenSearchParameter;
  [MedicationDispenseParameters.Medication]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Patient]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Status]?: TokenSearchParameter;
}

// MedicationRequest Parameters
export enum MedicationRequestParameters {
  AuthoredOn = 'org.hl7.fhir.http.medication-request.authored-on',
  Medication = 'org.hl7.fhir.http.medication-request.medication',
  Patient = 'org.hl7.fhir.http.medication-request.patient',
  Status = 'org.hl7.fhir.http.medication-request.status',
  Subject = 'org.hl7.fhir.http.medication-request.subject'
}

// MedicationRequest Resource Interface
export interface MedicationRequestTemplateFHIR {
  [MedicationRequestParameters.AuthoredOn]?: DateSearchParameter;
  [MedicationRequestParameters.Medication]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Patient]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Status]?: TokenSearchParameter;
}

// MedicationAdministration Parameters
export enum MedicationAdministrationParameters {
  Identifier = 'org.hl7.fhir.http.medication-administration.identifier',
  Medication = 'org.hl7.fhir.http.medication-administration.medication',
  Patient = 'org.hl7.fhir.http.medication-administration.patient',
  Status = 'org.hl7.fhir.http.medication-administration.status',
  EffectiveTime = 'org.hl7.fhir.http.medication-administration.effective-time',
  Subject = 'org.hl7.fhir.http.medication-administration.subject'
}

// MedicationAdministration Resource Interface
export interface MedicationAdministrationTemplateFHIR {
  [MedicationAdministrationParameters.Identifier]?: TokenSearchParameter;
  [MedicationAdministrationParameters.Medication]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Patient]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Status]?: TokenSearchParameter;
  [MedicationAdministrationParameters.EffectiveTime]?: DateSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
}
