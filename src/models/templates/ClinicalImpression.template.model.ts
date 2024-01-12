import { ClinicalImpressionParameters } from '../params';
import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from '../params/Search.params.model';
  
export interface ClinicalImpressionTemplateFHIR {
  [ClinicalImpressionParameters.Assessor]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Date]?: DateSearchParameter;
  [ClinicalImpressionParameters.FindingCode]?: TokenSearchParameter;
  [ClinicalImpressionParameters.FindingRef]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Identifier]?: TokenSearchParameter;
  [ClinicalImpressionParameters.Investigation]?: TokenSearchParameter;
  [ClinicalImpressionParameters.Patient]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Previous]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Problem]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Status]?: TokenSearchParameter;
  [ClinicalImpressionParameters.Support]?: ReferenceSearchParameter;
  [ClinicalImpressionParameters.Subject]?: ReferenceSearchParameter;
}
  
