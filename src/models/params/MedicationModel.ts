import {
  TokenSearchParameter,
  ReferenceSearchParameter,
  DateSearchParameter,
} from './SearchParamsModel';

// Medication Parameters
export enum MedicationParameters {
  Code = 'code',
  Identifier = 'identifier',
  Manufacturer = 'manufacturer',
  Status = 'status',
}

// Medication Resource Interface
export interface MedicationResource {
  [MedicationParameters.Code]?: TokenSearchParameter;
  [MedicationParameters.Identifier]?: TokenSearchParameter;
  [MedicationParameters.Manufacturer]?: ReferenceSearchParameter;
  [MedicationParameters.Status]?: TokenSearchParameter;
}

// MedicationStatement Parameters
export enum MedicationStatementParameters {
  Category = 'category',
  Medication = 'medication',
  Identifier = 'identifier',
  Patient = 'patient',
  Status = 'status',
  Subject = 'subject'
}

// MedicationStatement Resource Interface
export interface MedicationStatementResource {
  [MedicationStatementParameters.Category]?: TokenSearchParameter;
  [MedicationStatementParameters.Medication]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Identifier]?: TokenSearchParameter;
  [MedicationStatementParameters.Patient]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Subject]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Status]?: TokenSearchParameter;
}

// MedicationDispense Parameters
export enum MedicationDispenseParameters {
  Identifier = 'identifier',
  Medication = 'medication',
  Patient = 'patient',
  Status = 'status',
}

// MedicationDispense Resource Interface
export interface MedicationDispenseResource {
  [MedicationDispenseParameters.Identifier]?: TokenSearchParameter;
  [MedicationDispenseParameters.Medication]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Patient]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Status]?: TokenSearchParameter;
}

// MedicationRequest Parameters
export enum MedicationRequestParameters {
  AuthoredOn = 'authored-on',
  Medication = 'medication',
  Patient = 'patient',
  Status = 'status',
  Subject = 'subject'
}

// MedicationRequest Resource Interface
export interface MedicationRequestResource {
  [MedicationRequestParameters.AuthoredOn]?: DateSearchParameter;
  [MedicationRequestParameters.Medication]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Patient]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Status]?: TokenSearchParameter;
}

// MedicationAdministration Parameters
export enum MedicationAdministrationParameters {
  Identifier = 'identifier',
  Medication = 'medication',
  Patient = 'patient',
  Status = 'status',
  EffectiveTime = 'effective-time',
  Subject = 'subject'
}

// MedicationAdministration Resource Interface
export interface MedicationAdministrationResource {
  [MedicationAdministrationParameters.Identifier]?: TokenSearchParameter;
  [MedicationAdministrationParameters.Medication]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Patient]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Status]?: TokenSearchParameter;
  [MedicationAdministrationParameters.EffectiveTime]?: DateSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
}
