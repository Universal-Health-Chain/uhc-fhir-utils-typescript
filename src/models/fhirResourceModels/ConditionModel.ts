import { URLSearchParams } from 'url';

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

  export class Condition {
    resourceData: ConditionResource;
    fhirRelease: string;
  
    constructor(url: string, fhirRelease: string = 'r4') {
      this.fhirRelease = fhirRelease;
      this.resourceData = {};
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
      const urlParams = new URLSearchParams(url);
      for (const [key, value] of urlParams.entries()) {
        if (key in ConditionParameters) {
          let parameter: SearchParameter;
          switch (key) {
            case ConditionParameters.AbatementBoolean:
            case ConditionParameters.AbatementString:
            case ConditionParameters.BodySite:
            case ConditionParameters.Category:
            case ConditionParameters.ClinicalStatus:
            case ConditionParameters.Code:
            case ConditionParameters.Severity:
            case ConditionParameters.Stage:
            case ConditionParameters.VerificationStatus:
              parameter = parseTokenParameter(value);
              break;
            case ConditionParameters.AbatementDate:
            case ConditionParameters.AssertedDate:
            case ConditionParameters.OnsetDate:
              parameter = parseDateParameter(value);
              break;
            case ConditionParameters.Identifier:
              parameter = parseTokenParameter(value);
              break;
            case ConditionParameters.Subject:
              parameter = parseReferenceParameter(value);
              break;
            default:
              throw new Error(`Unsupported parameter: ${key}`);
          }
          parameter.name = key;
          parameter.base = ['Condition'];
          this.resourceData[key as keyof ConditionResource] = parameter;
        }
      }
    }
  
    updateResourceData(newData: ConditionResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    // Method to convert the resourceData to FHIR resource goes here...
  }
  
