import { TokenSearchParameter, StringSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Added extra parameter "note"
// Create the TypeScript enumerator for the HTTP parameters of the AllergyIntolerance resource
export enum AllergyIntoleranceParameters {
  Category = 'org.hl7.fhir.http.allergy-intolerance.category',
  ClinicalStatus = 'org.hl7.fhir.http.allergy-intolerance.clinical-status',
  Code = 'org.hl7.fhir.http.allergy-intolerance.code',
  Criticality = 'org.hl7.fhir.http.allergy-intolerance.criticality',
  Date = 'org.hl7.fhir.http.allergy-intolerance.date',
  Identifier = 'org.hl7.fhir.http.allergy-intolerance.identifier',
  LastDate = 'org.hl7.fhir.http.allergy-intolerance.last-date',
  Patient = 'org.hl7.fhir.http.allergy-intolerance.patient',
  Recorder = 'org.hl7.fhir.http.allergy-intolerance.recorder',
  Reporter = 'org.hl7.fhir.http.allergy-intolerance.reporter',
  Type = 'org.hl7.fhir.http.allergy-intolerance.type',
  VerificationStatus = 'org.hl7.fhir.http.allergy-intolerance.verification-status',
  Asserter = 'org.hl7.fhir.http.allergy-intolerance.Asserter',
  Id = 'org.hl7.fhir.http.allergy-intolerance.Id',
  Note = 'org.hl7.fhir.http.allergy-intolerance.note',
  Severity = 'org.hl7.fhir.http.allergy-intolerance.severity',
  Onset = 'org.hl7.fhir.http.allergy-intolerance.onset',
  Manifestation = 'org.hl7.fhir.http.allergy-intolerance.manifestation',
  ExposureRoute = 'org.hl7.fhir.http.allergy-intolerance.exposure-route',
  Substance = 'org.hl7.fhir.http.allergy-intolerance.substance',
  ReactionNote = 'org.hl7.fhir.http.allergy-intolerance.reaction-note',
  ReactionDescription = 'org.hl7.fhir.http.allergy-intolerance.reaction-description',
}
  
  // Create the TypeScript interface for the AllergyIntolerance resource using the enumerator and the search parameter types
  export interface AllergyIntoleranceTemplateFHIR {
    [AllergyIntoleranceParameters.Category]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.ClinicalStatus]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Code]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Criticality]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Date]?: DateSearchParameter;
    [AllergyIntoleranceParameters.Identifier]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.LastDate]?: DateSearchParameter;
    [AllergyIntoleranceParameters.Manifestation]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Onset]?: DateSearchParameter;
    [AllergyIntoleranceParameters.Patient]?: ReferenceSearchParameter;
    [AllergyIntoleranceParameters.Recorder]?: ReferenceSearchParameter;
    [AllergyIntoleranceParameters.Reporter]?: ReferenceSearchParameter;
    [AllergyIntoleranceParameters.Severity]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Type]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.VerificationStatus]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.Note]?: StringSearchParameter;
    [AllergyIntoleranceParameters.Substance]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.ReactionDescription]?: StringSearchParameter;
    [AllergyIntoleranceParameters.ExposureRoute]?: TokenSearchParameter;
    [AllergyIntoleranceParameters.ReactionNote]?: StringSearchParameter;
  }
