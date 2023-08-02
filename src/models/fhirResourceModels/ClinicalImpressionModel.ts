import { URLSearchParams } from 'url';

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
  

  class ClinicalImpression {
    resourceData: ClinicalImpressionResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ClinicalImpressionParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ClinicalImpressionParameters.Assessor:
            case ClinicalImpressionParameters.FindingRef:
            case ClinicalImpressionParameters.Patient:
            case ClinicalImpressionParameters.Previous:
            case ClinicalImpressionParameters.Problem:
            case ClinicalImpressionParameters.Support:
              parameter = parseReferenceParameter(value);
              break;
            case ClinicalImpressionParameters.FindingCode:
            case ClinicalImpressionParameters.Identifier:
            case ClinicalImpressionParameters.Investigation:
            case ClinicalImpressionParameters.Status:
              parameter = parseTokenParameter(value);
              break;
            case ClinicalImpressionParameters.Date:
              parameter = parseDateParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['ClinicalImpression'];
          this.resourceData[key as keyof ClinicalImpressionResource] = parameter ;
        }
      }
    }
  
    updateResourceData(newData: ClinicalImpressionResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  