// Create the TypeScript enumerator for the HTTP parameters of the AllergyIntolerance resource
export enum AllergyIntoleranceParameters {
    Category = 'category',
    ClinicalStatus = 'clinical-status',
    Code = 'code',
    Criticality = 'criticality',
    Date = 'date',
    Identifier = 'identifier',
    LastDate = 'last-date',
    Manifestation = 'manifestation',
    Onset = 'onset',
    Patient = 'patient',
    Recorder = 'recorder',
    Reporter = 'reporter',
    Severity = 'severity',
    Type = 'type',
    VerificationStatus = 'verification-status',
    Asserter = "Asserter",
    Id = "Id"
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
  }
