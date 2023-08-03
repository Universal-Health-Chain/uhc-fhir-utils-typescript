export enum ClinicalImpressionParameters {
    Assessor = 'assessor',
    Date = 'date',
    FindingCode = 'finding-code',
    FindingRef = 'finding-ref',
    Identifier = 'identifier',
    Investigation = 'investigation',
    Patient = 'patient',
    Previous = 'previous',
    Problem = 'problem',
    Status = 'status',
    Support = 'support',
  }
  
export interface ClinicalImpressionResource {
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
}
  
