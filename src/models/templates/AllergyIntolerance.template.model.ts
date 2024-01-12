import { AllergyIntoleranceParameters } from '../params';
import { TokenSearchParameter, StringSearchParameter, DateSearchParameter, ReferenceSearchParameter } from '../params/Search.params.model';


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
