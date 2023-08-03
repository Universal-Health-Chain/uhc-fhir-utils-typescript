export enum ConditionParameters {
    AbatementBoolean = 'abatement-boolean',
    AbatementDate = 'abatement-date',
    AbatementString = 'abatement-string',
    AssertedDate = 'asserted-date',
    BodySite = 'body-site',
    Category = 'category',
    ClinicalStatus = 'clinical-status',
    Code = 'code',
    Identifier = 'identifier',
    OnsetDate = 'onset-date',
    Severity = 'severity',
    Stage = 'stage',
    Subject = 'subject',
    VerificationStatus = 'verification-status',
  }
  
export interface ConditionResource {
  [ConditionParameters.AbatementBoolean]?: TokenSearchParameter;
  [ConditionParameters.AbatementDate]?: DateSearchParameter;
  [ConditionParameters.AbatementString]?: StringSearchParameter;
  [ConditionParameters.AssertedDate]?: DateSearchParameter;
  [ConditionParameters.BodySite]?: TokenSearchParameter;
  [ConditionParameters.Category]?: TokenSearchParameter;
  [ConditionParameters.ClinicalStatus]?: TokenSearchParameter;
  [ConditionParameters.Code]?: TokenSearchParameter;
  [ConditionParameters.Identifier]?: TokenSearchParameter;
  [ConditionParameters.OnsetDate]?: DateSearchParameter;
  [ConditionParameters.Severity]?: TokenSearchParameter;
  [ConditionParameters.Stage]?: TokenSearchParameter;
  [ConditionParameters.Subject]?: ReferenceSearchParameter;
  [ConditionParameters.VerificationStatus]?: TokenSearchParameter;
}
