import { URLSearchParams } from 'url';

// Create the TypeScript enumerator for the HTTP parameters of the AllergyIntolerance resource
enum AllergyIntoleranceParameters {
    Category = 'category',
    ClinicalStatus = 'clinical-status',
    Code = 'code',
    Criticality = 'criticality',
    Date = 'date',
    Identifier = 'identifier',
    LastDate = 'last-date',
    Manifestation = 'manifestation',
    Onset = 'onset',
    Patient = 'patient',
    Recorder = 'recorder',
    Reporter = 'reporter',
    Severity = 'severity',
    Type = 'type',
    VerificationStatus = 'verification-status',
    Asserter = "Asserter",
    Id = "Id"
}
  
  // Create the TypeScript interface for the AllergyIntolerance resource using the enumerator and the search parameter types
  interface AllergyIntoleranceResource {
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
  }
  
  // Create a class to store and manipulate the AllergyIntolerance resource
  
  
  class AllergyIntolerance {
    resourceData: AllergyIntoleranceResource = {};
  
    constructor(url: string) {
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
        const urlParams = new URLSearchParams(url);
        for (const [key, value] of urlParams.entries()) {
          if (key in AllergyIntoleranceParameters) {
            let parameter: SearchParameter;
            switch (key) {
              case AllergyIntoleranceParameters.Patient:
              case AllergyIntoleranceParameters.Recorder:
              case AllergyIntoleranceParameters.Asserter:
                parameter = parseReferenceParameter(value);
                break;
              case AllergyIntoleranceParameters.Category:
              case AllergyIntoleranceParameters.ClinicalStatus:
              case AllergyIntoleranceParameters.Code:
              case AllergyIntoleranceParameters.Id:
              case AllergyIntoleranceParameters.VerificationStatus:
                parameter = parseTokenParameter(value);
                break;
              case AllergyIntoleranceParameters.LastDate:
              case AllergyIntoleranceParameters.Onset:
                parameter = parseDateParameter(value);
                break;
              default:
                throw new Error(`Unsupported parameter: ${key}`);
            }
            parameter.name = key;
            parameter.base = ['AllergyIntolerance'];
            this.resourceData[key as keyof AllergyIntoleranceResource] = parameter;
          }
        }
      }
      
      
  
    updateResourceData(newData: AllergyIntoleranceResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    toFHIRResource(): any {
      // Convert to a FHIR resource format
      return this.resourceData;
    }
  }
  
  // Now you could create a Jest test case
  describe('AllergyIntolerance', () => {
    const url = "?category=food&code=227493005&patient=Patient/1";
  
    it('should create AllergyIntolerance from URL', () => {
      const resource = new AllergyIntolerance(url);
      expect(resource.resourceData).toHaveProperty('category');
      expect(resource.resourceData.category?.value).toEqual('food');
      expect(resource.resourceData).toHaveProperty('code');
      expect(resource.resourceData.code?.value).toEqual('227493005');
      expect(resource.resourceData).toHaveProperty('patient');
      expect(resource.resourceData.patient?.value).toEqual('Patient/1');
    });
  
    it('should populate AllergyIntolerance from URL using fromUrlParams method', () => {
      const resource = new AllergyIntolerance("");
      resource.fromUrlParams(url);
      expect(resource.resourceData).toHaveProperty('category');
      expect(resource.resourceData.category?.value).toEqual('food');
      expect(resource.resourceData).toHaveProperty('code');
      expect(resource.resourceData.code?.value).toEqual('227493005');
      expect(resource.resourceData).toHaveProperty('patient');
      expect(resource.resourceData.patient?.value).toEqual('Patient/1');
    });
  });
  