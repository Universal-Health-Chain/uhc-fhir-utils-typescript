import { TokenSearchParameter, DateSearchParameter, StringSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

export enum ConditionParameters {
    AbatementBoolean = 'org.hl7.fhir.http.condition.abatement-boolean',
    AbatementDate = 'org.hl7.fhir.http.condition.abatement-date',
    AbatementString = 'org.hl7.fhir.http.condition.abatement-string',
    AssertedDate = 'org.hl7.fhir.http.condition.asserted-date',
    BodySite = 'org.hl7.fhir.http.condition.body-site',
    Category = 'org.hl7.fhir.http.condition.category',
    ClinicalStatus = 'org.hl7.fhir.http.condition.clinical-status',
    Code = 'org.hl7.fhir.http.condition.code',
    Identifier = 'org.hl7.fhir.http.condition.identifier',
    OnsetDate = 'org.hl7.fhir.http.condition.onset-date',
    Severity = 'org.hl7.fhir.http.condition.severity',
    Stage = 'org.hl7.fhir.http.condition.stage',
    Subject = 'org.hl7.fhir.http.condition.subject',
    VerificationStatus = 'org.hl7.fhir.http.condition.verification-status',
  }
  
export interface ConditionTemplateFHIR {
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
