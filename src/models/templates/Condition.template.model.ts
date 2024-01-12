import { ConditionParameters } from '../params';
import { TokenSearchParameter, DateSearchParameter, StringSearchParameter, ReferenceSearchParameter } from '../params/Search.params.model';

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
