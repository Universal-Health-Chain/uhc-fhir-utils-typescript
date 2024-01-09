import { ReferenceSearchParameter, DateSearchParameter, TokenSearchParameter } from './SearchParamsModel';

export enum ClinicalImpressionParameters {
  Assessor = 'org.hl7.fhir.http.clinical-impression.assessor',
  Date = 'org.hl7.fhir.http.clinical-impression.date',
  FindingCode = 'org.hl7.fhir.http.clinical-impression.finding-code',
  FindingRef = 'org.hl7.fhir.http.clinical-impression.finding-ref',
  Identifier = 'org.hl7.fhir.http.clinical-impression.identifier',
  Investigation = 'org.hl7.fhir.http.clinical-impression.investigation',
  Patient = 'org.hl7.fhir.http.clinical-impression.patient',
  Previous = 'org.hl7.fhir.http.clinical-impression.previous',
  Problem = 'org.hl7.fhir.http.clinical-impression.problem',
  Status = 'org.hl7.fhir.http.clinical-impression.status',
  Support = 'org.hl7.fhir.http.clinical-impression.support',
  Subject = 'org.hl7.fhir.http.clinical-impression.subject'
  }
  
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
  
