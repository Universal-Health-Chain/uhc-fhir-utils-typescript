
// Medication Parameters
export enum MedicationParameters {
  Code = 'org.hl7.fhir.http.Medication.code',
  Identifier = 'org.hl7.fhir.http.Medication.identifier',
  Manufacturer = 'org.hl7.fhir.http.Medication.manufacturer',
  Status = 'org.hl7.fhir.http.Medication.status',
}

// MedicationStatement Parameters
export enum MedicationStatementParameters {
  Category = 'org.hl7.fhir.http.MedicationStatement.category',
  Medication = 'org.hl7.fhir.http.MedicationStatement.medication',
  Identifier = 'org.hl7.fhir.http.MedicationStatement.identifier',
  Patient = 'org.hl7.fhir.http.MedicationStatement.patient',
  Status = 'org.hl7.fhir.http.MedicationStatement.status',
  Subject = 'org.hl7.fhir.http.MedicationStatement.subject'
}

// MedicationDispense Parameters
export enum MedicationDispenseParameters {
  Identifier = 'org.hl7.fhir.http.MedicationDispense.identifier',
  Medication = 'org.hl7.fhir.http.MedicationDispense.medication',
  Patient = 'org.hl7.fhir.http.MedicationDispense.patient',
  Status = 'org.hl7.fhir.http.MedicationDispense.status',
}

// MedicationRequest Parameters
export enum MedicationRequestParameters {
  AuthoredOn = 'org.hl7.fhir.http.MedicationRequest.authored-on',
  Medication = 'org.hl7.fhir.http.MedicationRequest.medication',
  Patient = 'org.hl7.fhir.http.MedicationRequest.patient',
  Status = 'org.hl7.fhir.http.MedicationRequest.status',
  Subject = 'org.hl7.fhir.http.MedicationRequest.subject'
}

// MedicationAdministration Parameters
export enum MedicationAdministrationParameters {
  Identifier = 'org.hl7.fhir.http.MedicationAdministration.identifier',
  Medication = 'org.hl7.fhir.http.MedicationAdministration.medication',
  Patient = 'org.hl7.fhir.http.MedicationAdministration.patient',
  Status = 'org.hl7.fhir.http.MedicationAdministration.status',
  EffectiveTime = 'org.hl7.fhir.http.MedicationAdministration.effective-time',
  Subject = 'org.hl7.fhir.http.MedicationAdministration.subject'
}
