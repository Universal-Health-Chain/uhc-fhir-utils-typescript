import { TokenSearchParameter, StringSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Added extra parameter "note"
// Create the TypeScript enumerator for the HTTP parameters of the AllergyIntolerance resource
export enum AllergyIntoleranceParameters {
  Category = 'category',
  ClinicalStatus = 'clinical-status',
  Code = 'code',
  Criticality = 'criticality',
  Date = 'date',
  Identifier = 'identifier',
  LastDate = 'last-date',
  Patient = 'patient',
  Recorder = 'recorder',
  Reporter = 'reporter',
  Type = 'type',
  VerificationStatus = 'verification-status',
  Asserter = 'Asserter',
  Id = 'Id',
  Note = 'note',
  Severity = 'severity',
  Onset = 'onset',
  Manifestation = 'manifestation',
  ExposureRoute = 'exposure-route',
  Substance = 'substance',
  ReactionNote = 'reaction-note',
  ReactionDescription = 'reaction-description',
}
  
  // Create the TypeScript interface for the AllergyIntolerance resource using the enumerator and the search parameter types
  export interface AllergyIntoleranceResource {
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
