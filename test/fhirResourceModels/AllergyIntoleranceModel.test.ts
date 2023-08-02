import {AllergyIntolerance} from '../../src/models/fhirResourceModels/AllergyIntoleranceModel'

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
  