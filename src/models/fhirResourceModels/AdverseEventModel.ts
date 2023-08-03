import { URLSearchParams } from 'url';

// Create the TypeScript enumerator for the HTTP parameters of the AdverseEvent resource
enum AdverseEventParameters {
    Category = 'category',
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    Reaction = 'reaction',
    Recorder = 'recorder',
    Seriousness = 'seriousness',
    Study = 'study',
    Subject = 'subject',
    Substance = 'substance',
  }
  
  // Create the TypeScript interface for the AdverseEvent resource using the enumerator and the search parameter types
  interface AdverseEventResource {
    [AdverseEventParameters.Category]?: TokenSearchParameter;
    [AdverseEventParameters.Date]?: DateSearchParameter;
    [AdverseEventParameters.Identifier]?: TokenSearchParameter;
    [AdverseEventParameters.Location]?: ReferenceSearchParameter;
    [AdverseEventParameters.Reaction]?: ReferenceSearchParameter;
    [AdverseEventParameters.Recorder]?: ReferenceSearchParameter;
    [AdverseEventParameters.Seriousness]?: TokenSearchParameter;
    [AdverseEventParameters.Study]?: ReferenceSearchParameter;
    [AdverseEventParameters.Subject]?: ReferenceSearchParameter;
    [AdverseEventParameters.Substance]?: ReferenceSearchParameter;
  }
  

  // Create a class to store and manipulate the AdverseEvent resource
export class AdverseEvent {
    resourceData: AdverseEventResource = {};
    fhirRelease: string = 'r4';
  
    constructor(url: string, fhirRelease?: string) {
      this.fhirRelease = fhirRelease || this.fhirRelease;
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
        const urlParams = new URLSearchParams(url);
        for (const [key, value] of urlParams.entries()) {
          if (key in AdverseEventParameters) {
            let parameter: SearchParameter;
            switch (key) {
              case AdverseEventParameters.Subject:
              case AdverseEventParameters.Location:
              case AdverseEventParameters.Reaction:
              case AdverseEventParameters.Recorder:
              case AdverseEventParameters.Study:
                parameter = parseReferenceParameter(value);
                break;
              case AdverseEventParameters.Category:
              case AdverseEventParameters.Seriousness:
              case AdverseEventParameters.Identifier:
                parameter = parseTokenParameter(value);
                break;
              case AdverseEventParameters.Date:
                parameter = parseDateParameter(value);
                break;
              default:
                throw new Error(`Unsupported parameter: ${key}`);
            }
              parameter.name = key;
              parameter.base = ['AdverseEvent'];
              (this.resourceData as any)[key as keyof AdverseEventResource] = parameter as SearchParameter;
          }
        }
      }
      
      
  
    updateResourceData(newData: AdverseEventResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    toFHIRResource(fhirRelease?: string): any {
      fhirRelease = fhirRelease || this.fhirRelease;
      // Check FHIR release
      if (fhirRelease !== 'r4') {
        throw new Error(`Unsupported FHIR version: ${fhirRelease}`);
      }
      // Convert to a FHIR resource format
      // This is a placeholder implementation
      // You will need to map the AdverseEventResource to the actual FHIR resource format
      return this.resourceData;
    }
  }
  