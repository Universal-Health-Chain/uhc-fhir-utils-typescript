
// Medication Parameters
export enum MedicationParameters {
  Code = 'org.hl7.fhir.api.Medication.code',
  Identifier = 'org.hl7.fhir.api.Medication.identifier',
  Manufacturer = 'org.hl7.fhir.api.Medication.manufacturer',
  Status = 'org.hl7.fhir.api.Medication.status',
}

// MedicationStatement Parameters
export enum MedicationStatementParameters {
  Category = 'org.hl7.fhir.api.MedicationStatement.category',
  Medication = 'org.hl7.fhir.api.MedicationStatement.medication',
  Identifier = 'org.hl7.fhir.api.MedicationStatement.identifier',
  Patient = 'org.hl7.fhir.api.MedicationStatement.patient',
  Status = 'org.hl7.fhir.api.MedicationStatement.status',
  Subject = 'org.hl7.fhir.api.MedicationStatement.subject'
}

// MedicationDispense Parameters
export enum MedicationDispenseParameters {
  Identifier = 'org.hl7.fhir.api.MedicationDispense.identifier',
  Medication = 'org.hl7.fhir.api.MedicationDispense.medication',
  Patient = 'org.hl7.fhir.api.MedicationDispense.patient',
  Status = 'org.hl7.fhir.api.MedicationDispense.status',
}

// MedicationRequest Parameters
export enum MedicationRequestParameters {
  AuthoredOn = 'org.hl7.fhir.api.MedicationRequest.authored-on',
  Medication = 'org.hl7.fhir.api.MedicationRequest.medication',
  Patient = 'org.hl7.fhir.api.MedicationRequest.patient',
  Status = 'org.hl7.fhir.api.MedicationRequest.status',
  Subject = 'org.hl7.fhir.api.MedicationRequest.subject'
}

// MedicationAdministration Parameters
export enum MedicationAdministrationParameters {
  Identifier = 'org.hl7.fhir.api.MedicationAdministration.identifier',
  Medication = 'org.hl7.fhir.api.MedicationAdministration.medication',
  Patient = 'org.hl7.fhir.api.MedicationAdministration.patient',
  Status = 'org.hl7.fhir.api.MedicationAdministration.status',
  EffectiveTime = 'org.hl7.fhir.api.MedicationAdministration.effective-time',
  Subject = 'org.hl7.fhir.api.MedicationAdministration.subject'
}
